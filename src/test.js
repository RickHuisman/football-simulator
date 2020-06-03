(function () {
  var canvas = document.getElementById("field");
  var ctx = canvas.getContext("2d");

  var pitch = {
    draw: function () {
      // Outer lines
      ctx.beginPath();
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#060";
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#FFF";
      ctx.stroke();
      ctx.closePath();

      ctx.fillStyle = "#FFF";

      // Mid line
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.closePath();

      //Mid circle
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 73, 0, 2 * Math.PI, false);
      ctx.stroke();
      ctx.closePath();
      //Mid point
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 2, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();

      //Home penalty box
      ctx.beginPath();
      ctx.rect(0, (canvas.height - 322) / 2, 132, 322);
      ctx.stroke();
      ctx.closePath();
      //Home goal box
      ctx.beginPath();
      ctx.rect(0, (canvas.height - 146) / 2, 44, 146);
      ctx.stroke();
      ctx.closePath();
      //Home goal
      ctx.beginPath();
      ctx.moveTo(1, canvas.height / 2 - 22);
      ctx.lineTo(1, canvas.height / 2 + 22);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
      ctx.lineWidth = 1;

      //Home penalty point
      ctx.beginPath();
      ctx.arc(88, canvas.height / 2, 1, 0, 2 * Math.PI, true);
      ctx.fill();
      ctx.closePath();
      //Home half circle
      ctx.beginPath();
      ctx.arc(88, canvas.height / 2, 73, 0.29 * Math.PI, 1.71 * Math.PI, true);
      ctx.stroke();
      ctx.closePath();

      //Away penalty box
      ctx.beginPath();
      ctx.rect(canvas.width - 132, (canvas.height - 322) / 2, 132, 322);
      ctx.stroke();
      ctx.closePath();
      //Away goal box
      ctx.beginPath();
      ctx.rect(canvas.width - 44, (canvas.height - 146) / 2, 44, 146);
      ctx.stroke();
      ctx.closePath();
      //Away goal
      ctx.beginPath();
      ctx.moveTo(canvas.width - 1, canvas.height / 2 - 22);
      ctx.lineTo(canvas.width - 1, canvas.height / 2 + 22);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
      ctx.lineWidth = 1;
      //Away penalty point
      ctx.beginPath();
      ctx.arc(canvas.width - 88, canvas.height / 2, 1, 0, 2 * Math.PI, true);
      ctx.fill();
      ctx.closePath();
      //Away half circle
      ctx.beginPath();
      ctx.arc(
        canvas.width - 88,
        canvas.height / 2,
        73,
        0.71 * Math.PI,
        1.29 * Math.PI,
        false
      );
      ctx.stroke();
      ctx.closePath();

      //Home L corner
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, 0.5 * Math.PI, false);
      ctx.stroke();
      ctx.closePath();
      //Home R corner
      ctx.beginPath();
      ctx.arc(0, canvas.height, 8, 0, 2 * Math.PI, true);
      ctx.stroke();
      ctx.closePath();
      //Away R corner
      ctx.beginPath();
      ctx.arc(canvas.width, 0, 8, 0.5 * Math.PI, 1 * Math.PI, false);
      ctx.stroke();
      ctx.closePath();
      //Away L corner
      ctx.beginPath();
      ctx.arc(
        canvas.width,
        canvas.height,
        8,
        1 * Math.PI,
        1.5 * Math.PI,
        false
      );
      ctx.stroke();
      ctx.closePath();
    },
  };

  var ball = {
    x: 10,
    y: 10,
    speed: 100,
    target: {
      x: 0,
      y: 0,
    },
    move: function () {
      console.log(this);
      const h = Math.sqrt(
        Math.pow(Math.abs(this.x - this.target.x), 2) +
          Math.pow(Math.abs(this.y - this.target.y), 2)
      );
      const v = Math.acos(Math.abs(this.x - this.target.x) / h);

      const x = (this.speed / 20 + 1) * Math.cos(v);
      const y = (this.speed / 20 + 1) * Math.sin(v);

      this.speed = this.speed * 0.98;

      if (this.target.x >= this.x && this.target.y >= this.y) {
        this.setPosition(this.x + x, this.y + y);
      } else if (this.target.x >= this.x && this.target.y < this.y) {
        this.setPosition(this.x + x, this.y - y);
      } else if (this.target.x < this.x && this.target.y >= this.y) {
        this.setPosition(this.x - x, this.y + y);
      } else if (this.target.x < this.x && this.target.y < this.y) {
        this.setPosition(this.x - x, this.y - y);
      }
      this.draw();
    },
    draw: function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
      ctx.fillStyle = "#FFF";
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.stroke();
      ctx.closePath();
    },
  };

  var player = {
    team: "home",
    speed: 1.5,
    x: 10,
    y: 10,
    isAt: function (point) {
      return Math.abs(this.x - point.x) < 1
        ? Math.abs(this.y - point.y) < 1
          ? true
          : false
        : false;
    },
    move: function (point) {
      if (!this.isAt(point)) {
        var h = Math.sqrt(
          Math.pow(Math.abs(this.x - point.x), 2) +
            Math.pow(Math.abs(this.y - point.y), 2)
        );
        var v = Math.acos(Math.abs(this.x - point.x) / h);
        var x = this.speed * Math.cos(v);
        var y = this.speed * Math.sin(v);

        if (point.x >= this.x && point.y >= this.y) {
          this.x += x;
          this.y += y;
        } else if (point.x >= this.x && point.y < this.y) {
          this.x += x;
          this.y -= y;
        } else if (point.x < this.x && point.y >= this.y) {
          this.x -= x;
          this.y += y;
        } else if (point.x < this.x && point.y < this.y) {
          this.x -= x;
          this.y -= y;
        }
        this.draw();
      }
    },
    draw: function () {
      pitch.draw();
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
      ctx.fillStyle = this.team === "home" ? "#00F" : "#F00";
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.stroke();
      ctx.closePath();
    },
  };
  ball.draw();
  //player.draw();
  var coordinates = [
    { x: 200, y: 259 },
    { x: 230, y: 229 },
    { x: 290, y: 289 },
    { x: 550, y: 289 },
    { x: 400, y: 320 },
    { x: 200, y: 259 },
  ];

  var game = {
    timer: {},
    step: function () {
      //player.move(coordinates[0]);
      ball.move();
    },
    start: function () {
      pitch.draw();
      ball.target.x = 800;
      ball.target.y = 250;
      this.timer = window.setInterval(this.step, 50);
    },
  };
  game.start();
})();

// external.invoke("start_game");

// function startGame() {
//   external.invoke("start_game");
// }

// function loadHomeTeam(players) {
//   console.log(players);
// }

// function initField(homeTeam, awayTeam) {
//   console.log(homeTeam);
//   console.log(awayTeam);
//   homeTeam.players.forEach((player) => {
//     if (player.team_position != "SUB" && player.team_position != "RES") {
//       drawPlayer(player, true);
//     }
//   });

//   awayTeam.players.forEach((player) => {
//     if (player.team_position != "SUB" && player.team_position != "RES") {
//       drawPlayer(player, false);
//     }
//   });
// }

// function drawPlayer(player, isHomeTeam) {
//   const pos_on_field = getPositionOnField(player.team_position, isHomeTeam);

//   var c = document.getElementById("field");
//   var ctx = c.getContext("2d");

//   var circle = new Path2D();
//   const circleSize = 10;
//   const startAngle = 0;
//   const endAngle = 2 * Math.PI;

//   circle.arc(
//     pos_on_field[0],
//     pos_on_field[1],
//     circleSize,
//     startAngle,
//     endAngle
//   );

//   ctx.fill(circle);

//   ctx.fillText(
//     player.name,
//     pos_on_field[0] - circleSize,
//     pos_on_field[1] + circleSize * 2
//   );
// }

// function getPositionOnField(teamPosition, isHomeTeam) {
//   var position = [0, 0];
//   switch (teamPosition) {
//     case "GK":
//       position = [170, 20];
//       break;
//     case "LCB":
//       position = [130, 50];
//       break;
//     case "RCB":
//       position = [210, 50];
//       break;
//     case "LB":
//       position = [40, 70];
//       break;
//     case "RB":
//       position = [300, 70];
//       break;
//     case "RCM":
//       position = [90, 115];
//       break;
//     case "LCM":
//       position = [250, 115];
//       break;
//     case "CDM":
//       position = [170, 115];
//       break;
//     case "RW":
//       position = [90, 180];
//       break;
//     case "LW":
//       position = [250, 180];
//       break;
//     case "ST":
//       position = [170, 180];
//       break;
//     case "CF":
//       position = [170, 160];
//       break;
//   }

//   if (!isHomeTeam) {
//     position[1] = 420 - position[1];
//   }

//   return position;
// }

// function addPlayer() {
//   var node = document.createElement("SPAN");
//   node.className += "player";
//   document.getElementById("players").appendChild(node);
// }
