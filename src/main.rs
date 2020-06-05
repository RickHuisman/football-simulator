use serde::{Deserialize, Serialize};

mod simulator;
mod game;
mod fifa;

fn main() {
    simulator::start();
}
