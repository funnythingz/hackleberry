http_path = "/"
#sass_options = (environment == :production) ? {:debug_info => false} : {:debug_info => true}
css_dir = (environment == :production) ? "css" : "css_debug"
sass_dir = "sass"
images_dir = "imgs"
javascripts_dir = "js"

output_style = (environment == :production) ? :compressed : :expanded
line_comments = false
