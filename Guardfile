coffeescript_options = {
  input: '',
  output: 'dist',
  patterns: [%r{^(.+\.coffee)$}],
  bare: true,
}

guard 'coffeescript', coffeescript_options do
  coffeescript_options[:patterns].each { |pattern| watch(pattern) }
end

guard :concat, type:      "js",
               files:     %w(bitcore_ext blockchain_pen blockchain_pen_ui),
               input_dir: "dist",
               output:    "dist/bundle"
