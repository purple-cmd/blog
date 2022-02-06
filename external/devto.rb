require 'uri'
require 'net/http'
require 'json'

def get(endpoint)
    uri = URI(endpoint)
    res = Net::HTTP.get_response(uri)
    return JSON.parse(res.body) if res.is_a?(Net::HTTPSuccess)
end 

articles = get('https://dev.to/api/articles?username=purplecmd')
# puts articles
slugs = articles.map { |article| article["slug"] }

slugs.map { |slug| 
    article = get("https://dev.to/api/articles/purplecmd/#{slug}")
    md = article["body_markdown"]
    title = article["title"]
    File.open(article["slug"] + '.md', 'w') { |file| file.write("## " + title + '\n' + md) }
}
