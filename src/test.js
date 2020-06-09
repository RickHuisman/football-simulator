const Game = (function () {
  const canvas = document.getElementById("field");
  let timer = {};

  let homeTeam = [];
  let awayTeam = [];

  const step = function () {
    external.invoke("step");
  };

  const update = function (step) {
    reset();

    step.home_team.players.forEach((player) => {
      if (player.team_position != "SUB" && player.team_position != "RES") {
        homeTeam.push(new Player("home", player.team_position));
      }
    });

    step.away_team.players.forEach((player) => {
      // console.log(player.pos)
      if (player.team_position != "SUB" && player.team_position != "RES") {
        const p = new Player("away", player.team_position);
        awayTeam.push(p);
      }
    });

    draw();

    // console.log(homeTeam[0])
    // Game.draw();
    const player = awayTeam[0];
    const point = {
      x: 200,
      y: 200
    }
    player.move(point);
  }

  const reset = function () {
    homeTeam = [];
    awayTeam = [];
  }

  const start = function () {
    timer = window.setInterval(step, 500);
  };

  const draw = function () {
    Game.Pitch.draw(canvas);

    homeTeam.forEach((player) => player.draw());
    awayTeam.forEach((player) => player.draw());
  };

  return {
    start: start,
    update: update,
    homeTeam: homeTeam,
    awayTeam: awayTeam
  };
})();

Game.Pitch = (function () {
  const draw = function (canvas) {
    let ctx = canvas.getContext("2d");

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
    ctx.arc(canvas.width, canvas.height, 8, 1 * Math.PI, 1.5 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
  };

  return {
    draw: draw,
  };
})();

Game.Ball = (function () {
  let x = 10;
  let y = 10;
  let speed = 100;
  let target = {
    x: 0,
    y: 0,
  };

  const move = function () {
    const h = Math.sqrt(
      Math.pow(Math.abs(x - target.x), 2) + Math.pow(Math.abs(y - target.y), 2)
    );
    const v = Math.acos(Math.abs(x - target.x) / h);

    const x = (speed / 20 + 1) * Math.cos(v);
    const y = (speed / 20 + 1) * Math.sin(v);

    speed = speed * 0.98;

    if (target.x >= x && target.y >= y) {
      setPosition(x + x, y + y);
    } else if (target.x >= x && target.y < y) {
      setPosition(x + x, y - y);
    } else if (target.x < x && target.y >= y) {
      setPosition(x - x, y + y);
    } else if (target.x < x && target.y < y) {
      setPosition(x - x, y - y);
    }
    draw();
  };

  const draw = function (canvas) {
    let ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.closePath();
  };

  return {
    x: x,
    y: y,
    move: move,
    draw: draw,
  };
})();

const playerHomeStartingPosition = {
  GK: [40, 259],
  LCB: [120, 150],
  RCB: [120, 350],
  LB: [150, 60],
  RB: [150, 458],
  RCM: [250, 100],
  LCM: [250, 418],
  CDM: [250, 259],
  RW: [380, 418],
  LW: [380, 100],
  ST: [380, 259],
  CF: [330, 259],
};

const playerAwayStartingPosition = {
  GK: [760, 259],
  LCB: [680, 150],
  RCB: [680, 350],
  LB: [650, 60],
  RB: [650, 458],
  RCM: [550, 100],
  LCM: [550, 418],
  CDM: [550, 259],
  RW: [420, 418],
  LW: [420, 100],
  ST: [420, 259],
  CF: [420, 259],
};

class Player {
  constructor(team, role) {
    this.team = team;
    this.role = role;
    this.speed = 1.5; // TODO Remove from simulator
    const startingPosition = team === "home"
        ? playerHomeStartingPosition[role]
        : playerAwayStartingPosition[role];
    this.x = startingPosition[0];
    this.y = startingPosition[1];
  }

  isAt(point) {
    return Math.abs(this.x - point.x) < 1
      ? Math.abs(this.y - point.y) < 1
      : false;
  }

  move(point) {
    if (!this.isAt(point)) {
      let h = Math.sqrt(
        Math.pow(Math.abs(this.x - point.x), 2) +
          Math.pow(Math.abs(this.y - point.y), 2)
      );
      let v = Math.acos(Math.abs(this.x - point.x) / h);
      let x = this.speed * Math.cos(v);
      let y = this.speed * Math.sin(v);

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
  }

  draw() {
    const canvas = document.getElementById("field");
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.team === "home" ? "#00F" : "#F00";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.closePath();
  }
}

function step(step) {
  Game.update(step);
}

Game.start();