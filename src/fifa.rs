use crate::game::Player;
use crate::game::Position;
use crate::game::Team;
use csv::StringRecord;
use std::path::Path;

pub fn extract_players(path: &String) -> Vec<Player> {
    let f_path = Path::new(&path);
    let mut rdr = csv::Reader::from_path(f_path).unwrap();

    let mut players = Vec::new();
    for result in rdr.records() {
        let record = result.expect("a CSV record");
        players.push(get_player(record));
    }

    players
}

pub fn get_team(club_name: String, path: &String) -> Team {
    let f_path = Path::new(&path);
    let mut rdr = csv::Reader::from_path(f_path).unwrap();

    let mut players = Vec::new();
    for result in rdr.records() {
        let record = result.expect("a CSV record");

        let club = record.get(9).unwrap().to_string();
        if club == club_name {
            players.push(get_player(record));
        }
    }

    Team { players: players }
}

// pub fn get_team(player_list: &Vec<Player>, player_ids: Vec<u32>) -> Team {
//     let players = player_ids
//         .iter()
//         .map(|id| {
//             let mut players = player_list.clone().into_iter();
//             let player = players.find(|x| x.sofifaid == *id).unwrap();
//         })
//         .collect::<Vec<Player>>();

//     Team { players }
// }

fn get_player(record: StringRecord) -> Player {
    let sofifaid = record.get(0).unwrap().to_string().parse::<u32>().unwrap();
    let name = record.get(2).unwrap().to_string();
    let overall = record.get(10).unwrap().to_string().parse::<u32>().unwrap();
    let team_position = record.get(24).unwrap().to_string();
    Player::new(sofifaid, name, overall, team_position)
}
