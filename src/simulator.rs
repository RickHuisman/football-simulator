use piston_window::*;
use rand::Rng;

use crate::game::Game;

fn render<G>(game: &Game, context: Context, g: &mut G)
where
    G: Graphics,
{
    draw_pitch(context, g);

    let mut rand = rand::thread_rng();

    for player in &game.home_team.players {
        let x = rand.gen_range(0, &game.field_w);
        let y = rand.gen_range(0, game.field_h);
        draw_player(x, y, context, g);
    }
}

fn draw_pitch<G>(context: Context, g: &mut G)
where
    G: Graphics,
{
}

fn draw_player<G>(x: usize, y: usize, context: Context, g: &mut G)
where
    G: Graphics,
{
    let red = [1.0, 0.0, 0.0, 1.0]; // TODO Make const
    let square = rectangle::square(x as f64, y as f64, 10.0);

    ellipse(red, square, context.transform, g);
}

pub fn start() {
    let (w, h) = (800, 515);
    let game = Game::new(w, h, "FC Barcelona", "Liverpool");

    let mut window: PistonWindow = WindowSettings::new("Football Simulator", [800, 515]) // TODO W an height
        .exit_on_esc(true)
        .build()
        .unwrap();

    let white = [1.0; 4]; // TODO Make const
    while let Some(event) = window.next() {
        window.draw_2d(&event, |context, graphics, _device| {
            clear(white, graphics);

            render(&game, context, graphics);
        });
    }
}
