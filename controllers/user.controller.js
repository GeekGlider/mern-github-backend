const User = require('../models/User');

 const getUserprofileandRepos = async(req,res)=>{
    // res.send("User Profile is ready");
    const {username} = req.params;
    try {
        const userRes = await fetch(`https://api.github.com/users/${username}` , 
            {
              headers : {
                authorization : `token ${process.env.GITHUB_API_KEY}`,
              },
            }
          );
            const userProfile = await userRes.json();
            const repoinfo = await fetch(userProfile.repos_url , 
                {
                    headers : {
                      authorization : `token ${process.env.GITHUB_API_KEY}`,
                    },
                  }
            );
            const repos = await repoinfo.json();
            res.status(200).json({userProfile,repos});

    } catch (error) {
        res.status(500).json({ error : error.message});
    }
}

const likeprofile = async(req,res)=>{
  try {
    let {username} = req.params;
    let user = await User.findById(req.user._id.toString());
  let usertobeliked = await User.findOne({username});
  
  // console.log( "authUser" , user );
  // console.log( "Usertobeliked" , usertobeliked );
  if (!usertobeliked) {
    return res.status(404).json({ error: "User is not a member" });
  }
  if ( user.likedProfiles.includes(usertobeliked.username) ) {
   return res.status(400).json({ error: "User already liked" });
  }
  usertobeliked.likedBy.push({username:user.username,avatarUrl:user.avatarUrl,likedDate:Date.now()});
  user.likedProfiles.push(usertobeliked.username);
  await Promise.all([usertobeliked.save(),user.save()]);
  res.status(200).json({message : "user liked successfully"});
  } catch (error) {
    res.status(500).json({ error : error.message});
  }
  
} 

 const getlikes = async(req,res)=>{
  try {
    const user = await User.findById(req.user._id.toString());
    res.status(200).json({likedBy : user.likedBy});
  } catch (error) {
    res.status(500).json({ error : error.message});
  }
 
};

module.exports = {
  getUserprofileandRepos,
  likeprofile,
  getlikes,
};