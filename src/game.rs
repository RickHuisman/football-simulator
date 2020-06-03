use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Game {
    field_w: usize,
    field_h: usize,
    home_team: Team,
    away_team: Vec<Player>,
}

impl Game {
    // pub fn new(field_w: usize, field_h: usize) -> Game {
    //     let players = vec![
    //         Player {
    //             pos: Position::new(5, 5)
    //         };
    //         11
    //     ];
    //     Game {
    //         field_w,
    //         field_h,
    //         home_team: (*players).to_vec(),
    //         away_team: (*players).to_vec(),
    //     }
    // }

    pub fn get_home_team(game: Game) -> Team {
        game.home_team
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Position {
    x: usize,
    y: usize,
}

impl Position {
    pub fn new(x: usize, y: usize) -> Position {
        Position { x, y }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Team {
    pub players: Vec<Player>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Player {
    pub sofifaid: u32,
    pub name: String,
    pub overall: u32,
    pub team_position: String,
}

impl Player {
    pub fn new(sofifaid: u32, name: String, overall: u32, team_position: String) -> Player {
        Player {
            sofifaid,
            name,
            overall,
            team_position,
        }
    }
}
