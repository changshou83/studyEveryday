// https://www.codewars.com/kata/58f1e4a2445a4ccef600006d/javascript
// 在答案区看到的自认为的最佳实践

function chessValidator(board) {
  board = board.split('\n');

  function getPositions(c, mirror = false) {
    const res = [];
    for (let i = 0; i < 10; ++i)
      for (let j = 0; j < 9; ++j)
        if (board[i][j] === c) res.push([mirror ? 9 - i : i, j]);
    return res;
  }

  // Step 1: Check number-of-pieces constraints
  // 步骤一：查看棋子个数
  const n = c => getPositions(c).length;

  for (const c of '俥車傌馬炮砲相象仕士') if (n(c) > 2) return false;
  for (const c of '帥將') if (n(c) != 1) return false;
  for (const c of '兵卒') if (n(c) > 5) return false;

  // Step 2: Check position constraints
  // 步骤二：检查棋子(除兵卒)
  function checkPos(red, black, red_list) {
    const check = ([i, j]) => red_list.split(' ').includes('' + i + j);
    return (
      getPositions(red).every(check) && getPositions(black, true).every(check)
    );
  }

  if (
    !checkPos('相', '象', '92 96 70 74 78 52 56') ||
    !checkPos('仕', '士', '93 95 84 73 75') ||
    !checkPos('帥', '將', '73 74 75 83 84 85 93 94 95')
  )
    return false;

  // Step 3: Check kings' non-facing constraint
  // 步骤三：检查将帅
  const [i, j] = getPositions('帥')[0];
  const [u, v] = getPositions('將')[0];

  let blocked = j != v; // 将帅面对面
  for (let k = u + 1; k < i; ++k) {
    blocked |= '　－＋Ｘ｜'.search(board[k][j]) < 0; // 检查将帅是否在这些位置上
  }
  if (!blocked) return false;

  // Step 4: Check pawns (those still at own side)
  // 步骤四：检查兵卒
  for (let side = 0; side < 2; ++side) {
    // 0 = bottom (red), 1 = top (black)
    const pawns = getPositions('兵卒'[side], side == 1).filter(
      ([i, _]) => i > 4
    );

    if (
      pawns.some(([i, j]) => i > 6 || j % 2 == 1) ||
      new Set(pawns.map(([_, j]) => j)).size != pawns.length
    )
      return false;
  }
  return true;
}

// Testing
function assertEquals(result, standard, msg) {
  if (result === standard) return true;
  else console.log('Msg: ', msg);
}
function testBoard(board, result, msg) {
  console.log(board);
  assertEquals(chessValidator(board), result, msg);
  console.log('\n--分割线--\n');
}
var board =
  '\
車馬象士將士象馬車\n\
　　　｜Ｘ｜　　　\n\
　砲　＋－＋　砲　\n\
卒　卒　卒　卒　卒\n\
－－－－－－－－－\n\
－－－－－－－－－\n\
兵　兵　兵　兵　兵\n\
　炮　＋－＋　炮　\n\
　　　｜Ｘ｜　　　\n\
俥傌相仕帥仕相傌俥';
testBoard(board, true, 'A starting board is always valid');
board =
  '\
俥傌相仕帥仕相傌俥\n\
　　　｜Ｘ｜　　　\n\
　炮　＋－＋　炮　\n\
兵　兵　兵　兵　兵\n\
－－－－－－－－－\n\
－－－－－－－－－\n\
卒　卒　卒　卒　卒\n\
　砲　＋－＋　砲　\n\
　　　｜Ｘ｜　　　\n\
車馬象士將士象馬車';
testBoard(board, false, 'A flipped starting board will not work');
