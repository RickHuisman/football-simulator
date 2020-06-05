use web_view::*;
use rand::{thread_rng, Rng};

use crate::game::Game;

pub fn start() {
    let game = Game::new(105, 85, "FC Barcelona", "Liverpool");

    web_view::builder()
        .title("My Project")
        .content(Content::Html(get_content()))
        .size(820, 545)
        .resizable(false)
        .debug(true)
        .user_data(())
        .invoke_handler(|webview, arg| {
            match arg {
                "step" => {
                    let step = serde_json::to_string(&game.clone().step()).unwrap();

                    webview
                        .eval(&format!("step({})", step))
                        .unwrap();
                }
                _ => unimplemented!(),
            }
            Ok(())
        })
        .run()
        .unwrap();
}

fn get_content() -> String {
    let html = format!(
        r#"
		<!doctype html>
		<html>
            <head>
            <style>
            {styles}
            </style>
			</head>
            <body>
            <canvas id="field" width="800" height="518"></canvas>
            <span id="debug"></span>

            <script>
                {scripts}
            </script>
			</body>
		</html>
		"#,
        styles = include_str!("style.css"),
        scripts = include_str!("test.js")
    );

    html.to_string()
}
