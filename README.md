# Serve

`bundle exec jekyll serve`


# Build using docker

`docker run --rm --volume="$PWD:/srv/jekyll" -it jekyll/jekyll:3.8 jekyll build`

# Compile SCSS
`sass --source-map scss/main.scss:css/main.css`
