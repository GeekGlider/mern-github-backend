const explorePopularRepos = async(req,res) =>{
    const {language} = req.params;
    console.log(language);
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10` , 
        {
          headers : {
            authorization : `token ${process.env.GITHUB_API_KEY}`,
          },
        }
      );
      const data = await response.json();
      // console.log(data);
        res.status(200).json({ repos : data.items});
    } catch (error) {
        res.status(500).json({ error : error.message});
    }
}

module.exports = explorePopularRepos;