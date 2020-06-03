use web_view::*;

pub fn set_content(content: String, home_team: String, away_team: String) {
    web_view::builder()
        .title("My Project")
        .content(Content::Html(content))
        .size(340, 450)
        .resizable(false)
        .debug(true)
        .user_data(())
        .invoke_handler(|webview, arg| {
            match arg {
                "start_game" => {
                    webview
                        .eval(&format!("initField({}, {})", home_team, away_team))
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
            <canvas id="field" width="340" height="420"></canvas>

            <button>Test</button>

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
