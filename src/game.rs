use serde::{Deserialize, Serialize};

use crate::fifa;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Game {
    field_w: usize,
    field_h: usize,
    home_team: Team,
    away_team: Team,
}

impl Game {
    pub fn new(field_w: usize, field_h: usize, home_team: &str, away_team: &str) -> Game {
        let csv_file =
            "/Users/rickhuisman/Downloads/360179_705412_bundle_archive/players_20.csv".to_string();

        let home_team = fifa::get_team("FC Barcelona", &csv_file);
        let away_team = fifa::get_team("Liverpool", &csv_file);

        Game {
            field_w,
            field_h,
            home_team,
            away_team,
        }
    }

    pub fn step(self) -> GameStep {
        GameStep {
            home_team: self.home_team,
            away_team: self.away_team
        }
        // &self.home_team
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
