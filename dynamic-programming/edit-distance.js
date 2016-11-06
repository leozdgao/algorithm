/**
 * Edit Distance 编辑距离
 * 
 * word1 编辑到 word2 算需要的最少步数，操作仅限于：
 * - 插入一个字符（insert）
 * - 删除一个字符（delete）
 * - 替换一个字符（substitute）
 * 
 * 假设有字符串 a、字符串 b，则 d[i][j] 表示从字符串 a（a[1]...a[i]） 到字符串 b（b[1]...b[j]） 的编辑距离，其中：
 * - d[i][0] = i
 * - d[0][j] = j
 * 注：此处的 0 表示空字符串，1 代表字符串的第一个字母，以此类推
 */

// 变体：
// Longest common subsequence (LCS)
// Hamming distance

'use strict'

/**
 * @param type 代表行为的类型：插入、删除、替换
 * @param index 代表发生行为的索引
 * @param val 代表相关行为携带的值
 */
function buildAction(type, index, val) {
  return { type, index, val }
}

function setTwoDimArray(arr, i, j, val) {
  if (!arr[i]) arr[i] = []
  arr[i][j] = val

  return arr
}

// TODO：记录操作
function editDistance(a, b) {
  const d = [], m = a.length, n = b.length
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i == 0) {
        // 当字符串 a 为空字符串时，转化为 b 的操作全部认为是插入
        setTwoDimArray(
          d, i, j, j
         )
        continue
      }
      // 当字符串 b 为空字符串时，转化为 a 的操作全部认为是删除
      if (j == 0) {
        setTwoDimArray(
          d, i, j, i
        )
        continue
      }

      // 由于 0 代表空字符串，所以这边的 i-1 和 j-1 才是代表字符串的索引值
      if (a[i - 1] == b[j - 1]) {
        setTwoDimArray(d, i, j, d[i - 1][j - 1])
        continue
      }

      const minD = Math.min(
        // 删除
        d[i-1][j] + 1, // fab => fd 的编辑距离相当于 fa => fd 的编辑距离 + 1 
        // 插入
        d[i][j-1] + 1, // fab => fmny 的编辑距离相当于 fab => fmn 的编辑距离 + 1
        // 替换
        d[i-1][j-1] + 1 // fab => fmn 的编辑距离相当于 fa => fm 的编辑距离 + 1
      )

      setTwoDimArray(d, i, j, minD)
    }
  }

  return d
  // return d[m][n]
}

function editDistanceAction(a, b) {
  const d = [], m = a.length, n = b.length
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i == 0) {
        // 当字符串 a 为空字符串时，转化为 b 的操作全部认为是插入
        setTwoDimArray(
          d, i, j,
          buildAction('insert', j, b[j])
         )
        continue
      }
      // 当字符串 b 为空字符串时，转化为 a 的操作全部认为是删除
      if (j == 0) {
        setTwoDimArray(
          d, i, j,
          buildAction('remove', i, a[i])
        )
        continue
      }

      // 由于 0 代表空字符串，所以这边的 i-1 和 j-1 才是代表字符串的索引值
      if (a[i - 1] == b[j - 1]) {
        // 相等的情况下不做任何操作
        setTwoDimArray(d, i, j, null)
        continue
      }

      // 删除
      const rd = d[i-1][j] + 1 // fab => fd 的编辑距离相当于 fa => fd 的编辑距离 + 1
      // 插入
      const id = d[i][j-1] + 1 // fab => fmny 的编辑距离相当于 fab => fmn 的编辑距离 + 1
      // 替换
      const sd = d[i-1][j-1] + 1 // fab => fmn 的编辑距离相当于 fa => fm 的编辑距离 + 1

      if (rd < id) {
        if (rd < sd) {
          setTwoDimArray(
            d, i, j,
            buildAction('remove', i, a[i])
          )
        } else {
          setTwoDimArray(
            d, i, j,
            buildAction('substitue', i, b[j])
          )
        }
      } else {
        if (id < sd) {
          setTwoDimArray(
            d, i, j,
            buildAction('insert', i, b[j])
          )
        } else {
          setTwoDimArray(
            d, i, j,
            buildAction('substitue', i, b[j])
          )
        }
      }

      // setTwoDimArray(d, i, j, minD)
    }
  }

  return d
  // return d[m][n]
}

function printTwoDimArray(d) {
  return console.log(d.map(arr => arr.join('   ')).join('\n\n'))
}

function printTwoDimArrayActions(word1, word2) {
  const i = word1.length, j = word2.length
  const d = editDistanceAction(word1, word2)
  const actions = []
  for (let k = 1; k <= i; k++) {
    if (d[k][k]) actions.push(d[k][k])
  }
  if (j > i) {
    for (let k = i + 1; k <= j; k++) {
      if (d[i][k]) actions.push(d[i][k])
    }
  } else {
    for (let k = j + 1; k <= i; k++) {
      if (d[k][j]) actions.push(d[k][j])
    }
  }

  console.log(
    actions.map(act => `${act.type} ${act.val} from index ${act.index}`).join('\n')
  )
  // console.log(actions.length)
}

const word1 = 'abcde'
const word2 = 'cabef'
// const d = editDistance(word1, word2)
// printTwoDimArray(d)
// const d = editDistanceAction(word1, word2)

// printTwoDimArrayActions(word1, word2)

// console.log('\n')
// console.log('result:', d[word1.length][word2.length])

var diff = require("list-diff2")
var oldList = [{id: "a"}, {id: "b"}, {id: "c"}, {id: "d"}, {id: "e"}]
// var newList = [{id: "c"}, {id: "a"}, {id: "b"}, {id: "e"}, {id: "f"}]
var newList = [{id: "c"}, {id: "e"}, {id: "a"}, {id: "b"}, {id: "f"}]

var moves = diff(oldList, newList, "id")

console.log(JSON.stringify(moves, null, 4))
