use serde::{Deserialize, Serialize};

use crate::fifa;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Game {
    pub field_w: usize,
    pub field_h: usize,
    pub home_team: Team,
    pub away_team: Team,
}

impl Game {
    pub fn new(field_w: usize, field_h: usize, home_team: &str, away_team: &str) -> Game {
        let csv_file =
            "/Users/rickhuisman/Downloads/360179_705412_bundle_archive/players_20.csv".to_string();

        Game {
            field_w,
            field_h,
            home_team: fifa::get_team(home_team, &csv_file),
            away_team: fifa::get_team(away_team, &csv_file),
        }
    }

    pub fn step(&mut self) -> GameStep {
        // Update player positions

        self.home_team.players[0].pos.x += 10;

        // for player in &self.home_team.players {
        //     player.pos.x += 10;
        // }

        GameStep {
            home_team: self.home_team.clone(),
            away_team: self.away_team.clone(),
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GameStep {
    home_team: Team,
    away_team: Team,
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

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Team {
    pub players: Vec<Player>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Player {
    pub sofifaid: u32,
    pub name: String,
    pub overall: u32,
    pub team_position: String,
    pub pos: Position,
}

impl Player {
    pub fn new(sofifaid: u32, name: String, overall: u32, team_position: String) -> Player {
        Player {
            sofifaid,
            name,
            overall,
            team_position,
            pos: Position::new(0, 0),
        }
    }
}
