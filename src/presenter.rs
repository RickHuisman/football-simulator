use web_view::*;

pub fn set_content(content: String, home_team: String, away_team: String) {
    web_view::builder()
        .title("My Project")
        .content(Content::Html(content))
        .size(820, 539)
        .resizable(false)
        .debug(true)
        .user_data(())
        .invoke_handler(|webview, arg| {
            match arg {
                "start_game" => {
                    webview
                        // .eval(&format!("startGame({}, {})", home_team, away_team))
                        .eval(&format!("startGame({}, {})", home_team, away_team))
                        .unwrap();
                }
                _ => unimplemented!(),
            }
            Ok(())
        })
        .run()
        .unwrap();
}

pub fn get_content() -> String {
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
