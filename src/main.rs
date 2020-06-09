use piston_window::*;

mod fifa;
mod game;
mod simulator;

// fn render<G>(context: Context, g: &mut G)
// where
//     G: Graphics,
// {
//     draw_pitch(context, g);

//     let home_team = fifa::draw_player(context, g);
// }

// fn draw_pitch<G>(context: Context, g: &mut G)
// where
//     G: Graphics,
// {
// }

// fn draw_player<G>(context: Context, g: &mut G)
// where
//     G: Graphics,
// {
//     let red = [1.0, 0.0, 0.0, 1.0];
//     let square = rectangle::square(0.0, 0.0, 10.0);

//     ellipse(
//         red, // red
//         square,
//         context.transform,
//         g,
//     );
// }

fn main() {
    simulator::start();

    // let red = [1.0, 0.0, 0.0, 1.0];
    // let square = rectangle::square(0.0, 0.0, 10.0);

    // let mut window: PistonWindow = WindowSettings::new("Football Simulator", [800, 515])
    //     .exit_on_esc(true)
    //     .build()
    //     .unwrap();

    // while let Some(event) = window.next() {
    //     window.draw_2d(&event, |context, graphics, _device| {
    //         clear([1.0; 4], graphics);

    //         render(context, graphics);
    // rectangle(
    //     red, // red
    //     square,
    //     context.transform,
    //     graphics,
    // );

    // draw_player(context, graphics);

    // ellipse(
    //     red, // red
    //     square,
    //     context.transform,
    //     graphics,
    // );

    // draw_player(context, graphics);
    // });
    // }
}
