use serde::{Deserialize, Serialize};

mod fifa;
mod game;
mod presenter;

fn main() {
    let csv_file =
        "/Users/rickhuisman/Downloads/360179_705412_bundle_archive/players_20.csv".to_string();

    let home_team = fifa::get_team("FC Barcelona", &csv_file);
    let away_team = fifa::get_team("Liverpool", &csv_file);

    let content = presenter::get_content();
    presenter::set_content(
        content,
        serde_json::to_string(&home_team).unwrap(),
        serde_json::to_string(&away_team).unwrap(),
    );
}
