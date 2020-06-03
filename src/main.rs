use serde::{Deserialize, Serialize};

mod fifa;
mod game;
mod presenter;

fn main() {
    let csv_file =
        "/Users/rickhuisman/Downloads/360179_705412_bundle_archive/players_20.csv".to_string();

    let home_team = fifa::get_team("FC Barcelona".to_string(), &csv_file);

    let away_team = fifa::get_team("Liverpool".to_string(), &csv_file);
    for player in &home_team.players {
        println!("{:?}", player);
    }

    let data = serde_json::to_string(&home_team).unwrap();
    let data2 = serde_json::to_string(&away_team).unwrap();
    let content = presenter::get_content();
    presenter::set_content(content, data, data2);
}
