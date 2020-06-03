external.invoke("start_game");

function startGame() {
  external.invoke("start_game");
}

function loadHomeTeam(players) {
  console.log(players);
}

function initField(homeTeam, awayTeam) {
  console.log(homeTeam);
  console.log(awayTeam);
  homeTeam.players.forEach((player) => {
    if (player.team_position != "SUB" && player.team_position != "RES") {
      drawPlayer(player);
    }
  });

  awayTeam.players.forEach((player) => {
    if (player.team_position != "SUB" && player.team_position != "RES") {
      drawPlayer(player);
    }
  });
}

function drawPlayer(player) {
  const pos_on_field = getPositionOnField(player.team_position);

  var c = document.getElementById("field");
  var ctx = c.getContext("2d");

  var circle = new Path2D();
  const circleSize = 10;
  const startAngle = 0;
  const endAngle = 2 * Math.PI;

  circle.arc(
    pos_on_field[0],
    pos_on_field[1],
    circleSize,
    startAngle,
    endAngle
  );

  ctx.fill(circle);

  ctx.fillText(
    player.name,
    pos_on_field[0] - circleSize,
    pos_on_field[1] + circleSize * 2
  );
}

function getPositionOnField(teamPosition) {
  var position = [0, 0];
  switch (teamPosition) {
    case "GK":
      position = [170, 20];
      break;
    case "LCB":
      position = [130, 50];
      break;
    case "RCB":
      position = [210, 50];
      break;
    case "LB":
      position = [40, 70];
      break;
    case "RB":
      position = [300, 70];
      break;
    case "RCM":
      position = [90, 115];
      break;
    case "LCM":
      position = [250, 115];
      break;
    case "CDM":
      position = [170, 115];
      break;
    case "RW":
      position = [90, 180];
      break;
    case "LW":
      position = [250, 180];
      break;
    case "ST":
      position = [170, 180];
      break;
  }
  return position;
}

function addPlayer() {
  var node = document.createElement("SPAN");
  node.className += "player";
  document.getElementById("players").appendChild(node);
}
