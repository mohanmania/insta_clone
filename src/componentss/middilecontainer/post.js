
import React, { useState, useEffect } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { db } from "../../firebase/firebase"; // Firebase setup
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; // Firebase Firestore imports
import "./post.css";


const followers = [
  { username: 'mohanmania51', photo: 'https://images.pexels.com/photos/938639/pexels-photo-938639.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { username: 'Anviyth@le-0 t-', photo: 'https://images.pexels.com/photos/30092632/pexels-photo-30092632/free-photo-of-young-man-overlooking-scenic-lake-in-india.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { username: 'Heartles_s k@N', photo: 'https://images.pexels.com/photos/301952/pexels-photo-301952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { username: 'Mahesh Babu-N', photo: 'https://images.pexels.com/photos/674268/pexels-photo-674268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { username: 'pullaraomul099', photo: 'https://cdn.pixabay.com/photo/2020/09/19/20/01/woman-5585332_1280.jpg' },
  { username: 'imthee_mt_04.N ', photo: 'https://images.pexels.com/photos/354951/pexels-photo-354951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { username: 'pullaraomul099 ', photo: 'https://cdn.pixabay.com/photo/2020/09/19/20/01/woman-5585332_1280.jpg' },
  { username: 'M..triveni_/N624 ', photo: 'https://1.bp.blogspot.com/-uT-iKtRIHGA/Tgnqs8ZLMgI/AAAAAAAALKI/EfOhxGBwD4Y/s1600/Sam.JPG' },
  { username: 'shiva__3575Ns$   ', photo: 'https://images.pexels.com/photos/674268/pexels-photo-674268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { username: 'D..దుర్గ దుర్గ89  ', photo: 'https://thumbs.dreamstime.com/z/portrait-indian-people-street-puducherry-india-december-circa-years-woman-smiling-face-village-front-view-vibrant-174351620.jpg' },
  { username: 'sumathi8698_N  ', photo: 'https://thumbs.dreamstime.com/b/indian-villager-pics-jamshedpur-jharkhand-poor-people-femeli-photos-beach-rivers-indian-villager-pics-jamshedpur-poor-pepple-176242972.jpg' },
  { username: 'N-9sod-dal.la1_ ', photo: 'https://thumbs.dreamstime.com/b/portrait-old-unidentified-indian-man-his-village-tikamgarh-madhya-pradesh-india-february-173191045.jpg' },
  { username: 'chukkaankb..Ba ', photo: 'https://cdn.pixabay.com/photo/2016/01/03/09/50/boy-1119239_960_720.jpg' },
  { username: 'kar_@Nthikj6-61  ', photo: 'https://cdn.pixabay.com/photo/2020/09/19/20/01/woman-5585332_1280.jpg' },
  { username: 'social_armyed9  ', photo: 'https://cms.qz.com/wp-content/uploads/2016/03/7.jpg?quality=75&strip=all&w=940' },
  { username: 'dad_litle-priyas  ', photo: 'https://media.istockphoto.com/id/1313390800/photo/multiple-exposure-of-young-man-and-nature.jpg?s=2048x2048&w=is&k=20&c=BjQsumF29u57nnQhub5RV0H_c-Ai8nOBY83IR9sVlac=' },
  { username: 'ParshuBaby_23  ', photo: 'https://cdn.pixabay.com/photo/2016/03/27/19/20/indian-1283789_1280.jpg' },
];



const postImages = [
  'https://media.istockphoto.com/id/1313390800/photo/multiple-exposure-of-young-man-and-nature.jpg?s=2048x2048&w=is&k=20&c=BjQsumF29u57nnQhub5RV0H_c-Ai8nOBY83IR9sVlac=',
  'https://cdn.pixabay.com/photo/2016/03/27/19/20/indian-1283789_1280.jpg',
  'https://media.istockphoto.com/id/1325880673/photo/young-indian-man-using-laptop.jpg?s=2048x2048&w=is&k=20&c=eSMZRe-odUEBOhYBptkN5yFKgW2_yhqUkR-FaIaoT2g=',
  'https://i.pinimg.com/originals/20/ba/5f/20ba5fcad4b430d65f1daea8ef4a96f7.jpg',
  'https://i.pinimg.com/originals/d2/5d/ee/d25dee054f1935936602ecaaa1f35d6d.jpg',
  "https://wallpapercave.com/wp/wp2610231.jpg",
  "https://wallpapertag.com/wallpaper/full/8/b/d/496947-top-3d-animation-wallpaper-3840x2160.jpg",
  "http://getmemetemplates.com/wp-content/uploads/2020/01/1578578243014-1024x576.png",
  "https://external-preview.redd.it/mXoiOpFthya_psW9SGeNWDkMg1qVsZZuqQnuKUhGyAw.jpg?auto=webp&s=a43b6f1747dd4ee76073d4c1d889900f838f60c7",
  "https://www.t5eiitm.org/wp-content/uploads/2020/02/meme-1.jpeg",
  "https://i.pinimg.com/originals/82/5b/40/825b40ded7bbd6159cd8ac88291b6923.jpg",
  "https://www.boredpanda.com/blog/wp-content/uploads/2023/02/memes-of-science-cover_800.png",
  "https://www.boredpanda.com/blog/wp-content/uploads/2022/09/it-humor-and-memes-211-63285cf3a401d__700.jpg",
  "https://i.pinimg.com/736x/9c/ac/f6/9cacf618baca94d160985f9a6aeac397.jpg",
  "https://i.pinimg.com/originals/82/5b/40/825b40ded7bbd6159cd8ac88291b6923.jpg",
  "http://getmemetemplates.com/wp-content/uploads/2020/01/1578578243014-1024x576.png",
  "https://scontent.fhyd1-3.fna.fbcdn.net/v/t1.6435-9/67607792_384957752378631_4059061419788730368_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=70y_esMPHMIQ7kNvgGgO2YL&_nc_zt=23&_nc_ht=scontent.fhyd1-3.fna&_nc_gid=AMq0tEFKFEDoCePIfpGbMeV&oh=00_AYBc0OFvFYGqJS9TLrRg-fZrl48VXaakOtydQaW6l9Uliw&oe=67B6C586",
  "https://wirally.com/wp-content/uploads/2023/02/Telugu-Meme-Templates.jpg",
  "https://i.pinimg.com/originals/28/5e/ea/285eeaa20d9a420673f2f3a5e6816fd5.jpg",
  "https://1.bp.blogspot.com/-eO2p-H3IBkk/Xw5UVyCaNnI/AAAAAAAAKiI/mdWIleFdp0ocmKhIeKUv6tMfbQnndhDhgCLcBGAsYHQ/s2048/eiGVCOP66815.jpg",
  "https://i.pinimg.com/564x/95/ff/0d/95ff0d62a8ffdd3c03da42466e5bca35.jpg",
  "https://i.pinimg.com/originals/56/71/98/567198dd2c960c47c81baa63c1733501.jpg",
  "https://i.pinimg.com/originals/9e/ae/d8/9eaed8ed0a131acdbcc5aef50a3ad5ea.jpg",
  "https://chaibisket.com/wp-content/uploads/2021/05/have-this2-1.jpg",
  "https://i.pinimg.com/originals/66/74/e4/6674e49af28265801818a9a6a2934382.jpg",
  "https://i.redd.it/rki51qch1kcz.jpg",
  "https://i.pinimg.com/736x/1b/81/35/1b8135fa69726ee7f7877ecca9a3b852.jpg",
  "https://i.ytimg.com/vi/7RTwsc1YKqE/maxresdefault.jpg",
  "https://i.pinimg.com/736x/97/c5/24/97c5248ca57116ee4a1f513acec9be11.jpg",
  "https://external-preview.redd.it/Fbq8N6Q2AgX8axQeuwy_uYuzk6iWl0Vzi0fGXbEKexc.jpg?auto=webp&s=9d256612f40848bd0054ab56ced947381a3fc4ea",
  "https://i.pinimg.com/originals/5b/10/29/5b102956aeb004592db969d12e8f19ad.jpg",
  "https://telugu.cdn.zeenews.com/telugu/sites/default/files/biggbossmemegeetu.jpeg",
  "https://i.pinimg.com/736x/50/27/75/5027755b6129345bc344a4c20bf2aef9.jpg",
  "https://i.pinimg.com/originals/51/5e/11/515e11b2c0662c301ef13eb296c4da3d.jpg",
  "https://i.pinimg.com/originals/c3/9a/e8/c39ae81e9faf2fad133dfd31f90bad3e.jpg",
  "https://i.pinimg.com/originals/40/7a/43/407a438b4d06dae516e021117c5d3923.jpg",
  "https://i.pinimg.com/736x/b9/4a/40/b94a40794c157cdafe41964b03ecbeff.jpg",
  "https://static.toiimg.com/photo/71644932.cms",
  "https://i.pinimg.com/736x/b3/10/81/b31081b71b4e315bb1e7cc2ebd63d46d.jpg",
  "https://i.pinimg.com/736x/35/9c/38/359c380c316cb2475a7b815e26524f6d.jpg",
  "https://i.pinimg.com/originals/61/b7/04/61b70491d0f62f6874def7f8671aefea.jpg",
  "https://pbs.twimg.com/media/DpdZVneXcAAi988.jpg",
  "https://telugu.cdn.zeenews.com/telugu/sites/default/files/Telugu-Rakshabandhan-Memes13.jpg",
  "https://i.ytimg.com/vi/DJpLpUizOWw/maxres2.jpg?sqp=-oaymwEoCIAKENAF8quKqQMcGADwAQH4Ac4FgAKACooCDAgAEAEYZSBlKFEwDw==&rs=AOn4CLCLJ8HjLGlrnw2HqkYLC-t5pIVRYA",
  "https://i.pinimg.com/originals/61/b7/04/61b70491d0f62f6874def7f8671aefea.jpg",
  "https://i.imgflip.com/5hy5je.jpg"
 
];
const postVideos = [
  "https://www.w3schools.com/html/movie.mp4", 
  // Add more video URLs here...
];




export default function Post() {
  const [randomUser, setRandomUser] = useState({});
  const [randomPostContent, setRandomPostContent] = useState(""); 
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 1000));
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isPostSaved, setIsPostSaved] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false); 

  useEffect(() => {
    setRandomUser(followers[Math.floor(Math.random() * followers.length)]);
    const isVideo = Math.random() < 0.5; 
    if (isVideo) {
      setRandomPostContent(postVideos[Math.floor(Math.random() * postVideos.length)]);
    } else {
      setRandomPostContent(postImages[Math.floor(Math.random() * postImages.length)]);
    }
  }, []);

  const handleLikeClick = () => {
    setLiked(!liked);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
     
      await addDoc(collection(db, "comments"), {
        username: randomUser.username,
        comment: newComment,
        timestamp: new Date(),
      });
      setComments([...comments, { username: randomUser.username, comment: newComment }]);
      // setNewComment(""); 
    }
  };

  const handleDeleteComment = (index) => {
   
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  const handleSavePost = async () => {
    const postRef = doc(db, "savedPosts", randomUser.username + "_" + new Date().getTime());
    await setDoc(postRef, {
      postContent: randomPostContent,
      user: randomUser.username,
      timestamp: new Date(),
    });
    setIsPostSaved(true);
  };

  const handleShareClick = () => {
    setShowUserList(!showUserList); 
  };

  const handleCommentIconClick = () => {
    setIsCommenting(!isCommenting); 
  };

  return (
    <div className="postSection">
      <div className="post">
        <div className="postinfo">
          <img className="profileInfoimg" src={randomUser.photo} alt="Profile" />
          <div className="postInfoUserName">{randomUser.username}</div>
          <div className="timingInfo">..{Math.floor(Math.random() * 60)}min</div>
        </div>

        <div className="postImg">
          {randomPostContent.endsWith(".mp4") ? (
            <video className="post-video" autoPlay loop>
              <source src={randomPostContent} type="video/mp4" />
              Your browser does not support the video 
            </video>
          ) : (
            <img className="post-img" src={randomPostContent} alt="Post" />
          )}
        </div>

        <div className="post-Icon-Blocks" style={{ height: "35px",backgroundColor:"rgb(122, 105, 105)"}}>
          <div className="leftIcon">
            {liked ? (
              <FavoriteIcon onClick={handleLikeClick} style={{ color: "red", cursor: "pointer" }} />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLikeClick} style={{ cursor: "pointer" }} />
            )}
            <span>{likeCount} likes</span>
          </div>
          <div className="rightIcon">
            <ModeCommentOutlinedIcon onClick={handleCommentIconClick} style={{ cursor: "pointer" }} />
            <span>{comments.length} comments </span>
            <BookmarkBorderOutlinedIcon
              style={{ cursor: "pointer" }}
              onClick={handleSavePost}
            />
            <span>{isPostSaved ? "Saved" : "Save"}</span>
            <ShareOutlinedIcon onClick={handleShareClick} style={{ cursor: "pointer" }} />
          </div>
        </div>

        {showUserList && (
          <div className="shareUserList">
            {followers.map((user, index) => (
              <div key={index} className="userToShare">
                <img className="userImg" src={user.photo} alt="User" />
                <div>{user.username}</div>
              </div>
            ))}
          </div>
        )}

        {isCommenting && (
          <div className="commentsSection">
            <input
              type="text"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
            />
            <button onClick={handleAddComment}>Send</button>
            <div className="commentsList">
              {comments.map((comment, index) => (
                <div key={index} className="commentItem">
                  <div>{comment.username}: {comment.comment}</div>
                  <button onClick={() => handleDeleteComment(index)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



// import React, { useState, useEffect } from 'react';
// import { Heart, Share2, MessageCircle, Bookmark } from 'lucide-react';
// import { 
//   collection, 
//   addDoc, 
//   deleteDoc, 
//   doc, 
//   setDoc, 
//   getDocs,
//   query,
//   where,
//   serverTimestamp 
// } from 'firebase/firestore';
// import { db } from "../../firebase/firebase";

// export default function ResponsivePost({ postId }) {
//   const [liked, setLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 1000));
//   const [isCommenting, setIsCommenting] = useState(false);
//   const [showShareList, setShowShareList] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [saved, setSaved] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [randomPost, setRandomPost] = useState(null);

//   const users = [
//     { username: 'mohanmania51', photo: 'https://images.pexels.com/photos/938639/pexels-photo-938639.jpeg?auto=compress&cs=tinysrgb&w=600' },
//   { username: 'Anviyth@le-0 t-', photo: 'https://images.pexels.com/photos/30092632/pexels-photo-30092632/free-photo-of-young-man-overlooking-scenic-lake-in-india.jpeg?auto=compress&cs=tinysrgb&w=600' },
//   { username: 'Heartles_s k@N', photo: 'https://images.pexels.com/photos/301952/pexels-photo-301952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
//   { username: 'Mahesh Babu-N', photo: 'https://images.pexels.com/photos/674268/pexels-photo-674268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
//   { username: 'pullaraomul099', photo: 'https://cdn.pixabay.com/photo/2020/09/19/20/01/woman-5585332_1280.jpg' },
//   { username: 'imthee_mt_04.N ', photo: 'https://images.pexels.com/photos/354951/pexels-photo-354951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
//   { username: 'pullaraomul099 ', photo: 'https://cdn.pixabay.com/photo/2020/09/19/20/01/woman-5585332_1280.jpg' },
//   { username: 'M..triveni_/N624 ', photo: 'https://1.bp.blogspot.com/-uT-iKtRIHGA/Tgnqs8ZLMgI/AAAAAAAALKI/EfOhxGBwD4Y/s1600/Sam.JPG' },
//   { username: 'shiva__3575Ns$   ', photo: 'https://images.pexels.com/photos/674268/pexels-photo-674268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
//   { username: 'D..దుర్గ దుర్గ89  ', photo: 'https://thumbs.dreamstime.com/z/portrait-indian-people-street-puducherry-india-december-circa-years-woman-smiling-face-village-front-view-vibrant-174351620.jpg' },
//   { username: 'sumathi8698_N  ', photo: 'https://thumbs.dreamstime.com/b/indian-villager-pics-jamshedpur-jharkhand-poor-people-femeli-photos-beach-rivers-indian-villager-pics-jamshedpur-poor-pepple-176242972.jpg' },
//   { username: 'N-9sod-dal.la1_ ', photo: 'https://thumbs.dreamstime.com/b/portrait-old-unidentified-indian-man-his-village-tikamgarh-madhya-pradesh-india-february-173191045.jpg' },
//   { username: 'chukkaankb..Ba ', photo: 'https://cdn.pixabay.com/photo/2016/01/03/09/50/boy-1119239_960_720.jpg' },
//   { username: 'kar_@Nthikj6-61  ', photo: 'https://cdn.pixabay.com/photo/2020/09/19/20/01/woman-5585332_1280.jpg' },
//   { username: 'social_armyed9  ', photo: 'https://cms.qz.com/wp-content/uploads/2016/03/7.jpg?quality=75&strip=all&w=940' },
//   { username: 'dad_litle-priyas  ', photo: 'https://media.istockphoto.com/id/1313390800/photo/multiple-exposure-of-young-man-and-nature.jpg?s=2048x2048&w=is&k=20&c=BjQsumF29u57nnQhub5RV0H_c-Ai8nOBY83IR9sVlac=' },
//   { username: 'ParshuBaby_23  ', photo: 'https://cdn.pixabay.com/photo/2016/03/27/19/20/indian-1283789_1280.jpg' },
//   ];

//   const postContents = [
//     'https://media.istockphoto.com/id/1313390800/photo/multiple-exposure-of-young-man-and-nature.jpg?s=2048x2048&w=is&k=20&c=BjQsumF29u57nnQhub5RV0H_c-Ai8nOBY83IR9sVlac=',
//       'https://cdn.pixabay.com/photo/2016/03/27/19/20/indian-1283789_1280.jpg',
//       'https://media.istockphoto.com/id/1325880673/photo/young-indian-man-using-laptop.jpg?s=2048x2048&w=is&k=20&c=eSMZRe-odUEBOhYBptkN5yFKgW2_yhqUkR-FaIaoT2g=',
//       'https://i.pinimg.com/originals/20/ba/5f/20ba5fcad4b430d65f1daea8ef4a96f7.jpg',
//       'https://i.pinimg.com/originals/d2/5d/ee/d25dee054f1935936602ecaaa1f35d6d.jpg',
//       "https://wallpapercave.com/wp/wp2610231.jpg",
//       "https://wallpapertag.com/wallpaper/full/8/b/d/496947-top-3d-animation-wallpaper-3840x2160.jpg",
//       "http://getmemetemplates.com/wp-content/uploads/2020/01/1578578243014-1024x576.png",
//       "https://external-preview.redd.it/mXoiOpFthya_psW9SGeNWDkMg1qVsZZuqQnuKUhGyAw.jpg?auto=webp&s=a43b6f1747dd4ee76073d4c1d889900f838f60c7",
//       "https://www.t5eiitm.org/wp-content/uploads/2020/02/meme-1.jpeg",
//       "https://i.pinimg.com/originals/82/5b/40/825b40ded7bbd6159cd8ac88291b6923.jpg",
//       "https://www.boredpanda.com/blog/wp-content/uploads/2023/02/memes-of-science-cover_800.png",
//       "https://www.boredpanda.com/blog/wp-content/uploads/2022/09/it-humor-and-memes-211-63285cf3a401d__700.jpg",
//       "https://i.pinimg.com/736x/9c/ac/f6/9cacf618baca94d160985f9a6aeac397.jpg",
//       "https://i.pinimg.com/originals/82/5b/40/825b40ded7bbd6159cd8ac88291b6923.jpg",
//       "http://getmemetemplates.com/wp-content/uploads/2020/01/1578578243014-1024x576.png",
//       "https://scontent.fhyd1-3.fna.fbcdn.net/v/t1.6435-9/67607792_384957752378631_4059061419788730368_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=70y_esMPHMIQ7kNvgGgO2YL&_nc_zt=23&_nc_ht=scontent.fhyd1-3.fna&_nc_gid=AMq0tEFKFEDoCePIfpGbMeV&oh=00_AYBc0OFvFYGqJS9TLrRg-fZrl48VXaakOtydQaW6l9Uliw&oe=67B6C586",
//       "https://wirally.com/wp-content/uploads/2023/02/Telugu-Meme-Templates.jpg",
//       "https://i.pinimg.com/originals/28/5e/ea/285eeaa20d9a420673f2f3a5e6816fd5.jpg",
//       "https://1.bp.blogspot.com/-eO2p-H3IBkk/Xw5UVyCaNnI/AAAAAAAAKiI/mdWIleFdp0ocmKhIeKUv6tMfbQnndhDhgCLcBGAsYHQ/s2048/eiGVCOP66815.jpg",
//       "https://i.pinimg.com/564x/95/ff/0d/95ff0d62a8ffdd3c03da42466e5bca35.jpg",
//       "https://i.pinimg.com/originals/56/71/98/567198dd2c960c47c81baa63c1733501.jpg",
//       "https://i.pinimg.com/originals/9e/ae/d8/9eaed8ed0a131acdbcc5aef50a3ad5ea.jpg",
//       "https://chaibisket.com/wp-content/uploads/2021/05/have-this2-1.jpg",
//       "https://i.pinimg.com/originals/66/74/e4/6674e49af28265801818a9a6a2934382.jpg",
//       "https://i.redd.it/rki51qch1kcz.jpg",
//       "https://i.pinimg.com/736x/1b/81/35/1b8135fa69726ee7f7877ecca9a3b852.jpg",
//       "https://i.ytimg.com/vi/7RTwsc1YKqE/maxresdefault.jpg",
//       "https://i.pinimg.com/736x/97/c5/24/97c5248ca57116ee4a1f513acec9be11.jpg",
//       "https://external-preview.redd.it/Fbq8N6Q2AgX8axQeuwy_uYuzk6iWl0Vzi0fGXbEKexc.jpg?auto=webp&s=9d256612f40848bd0054ab56ced947381a3fc4ea",
//       "https://i.pinimg.com/originals/5b/10/29/5b102956aeb004592db969d12e8f19ad.jpg",
//       "https://telugu.cdn.zeenews.com/telugu/sites/default/files/biggbossmemegeetu.jpeg",
//       "https://i.pinimg.com/736x/50/27/75/5027755b6129345bc344a4c20bf2aef9.jpg",
//       "https://i.pinimg.com/originals/51/5e/11/515e11b2c0662c301ef13eb296c4da3d.jpg",
//       "https://i.pinimg.com/originals/c3/9a/e8/c39ae81e9faf2fad133dfd31f90bad3e.jpg",
//       "https://i.pinimg.com/originals/40/7a/43/407a438b4d06dae516e021117c5d3923.jpg",
//       "https://i.pinimg.com/736x/b9/4a/40/b94a40794c157cdafe41964b03ecbeff.jpg",
//       "https://static.toiimg.com/photo/71644932.cms",
//       "https://i.pinimg.com/736x/b3/10/81/b31081b71b4e315bb1e7cc2ebd63d46d.jpg",
//       "https://i.pinimg.com/736x/35/9c/38/359c380c316cb2475a7b815e26524f6d.jpg",
//       "https://i.pinimg.com/originals/61/b7/04/61b70491d0f62f6874def7f8671aefea.jpg",
//       "https://pbs.twimg.com/media/DpdZVneXcAAi988.jpg",
//       "https://telugu.cdn.zeenews.com/telugu/sites/default/files/Telugu-Rakshabandhan-Memes13.jpg",
//       "https://i.ytimg.com/vi/DJpLpUizOWw/maxres2.jpg?sqp=-oaymwEoCIAKENAF8quKqQMcGADwAQH4Ac4FgAKACooCDAgAEAEYZSBlKFEwDw==&rs=AOn4CLCLJ8HjLGlrnw2HqkYLC-t5pIVRYA",
//       "https://i.pinimg.com/originals/61/b7/04/61b70491d0f62f6874def7f8671aefea.jpg",
//       "https://i.imgflip.com/5hy5je.jpg"
//   ];

//   useEffect(() => {
//     // Set random user and post on component mount
//     const randomUser = users[Math.floor(Math.random() * users.length)];
//     const randomPostContent = postContents[Math.floor(Math.random() * postContents.length)];
//     setCurrentUser(randomUser);
//     setRandomPost(randomPostContent);

//     // Fetch existing data
//     fetchPostData();
//   }, []);

//   const fetchPostData = async () => {
//     try {
//       // Fetch likes
//       const likesQuery = query(collection(db, 'likes'), where('postId', '==', postId));
//       const likesSnapshot = await getDocs(likesQuery);
//       setLikeCount(likesSnapshot.size);
      
//       // Fetch comments
//       const commentsQuery = query(collection(db, 'comments'), where('postId', '==', postId));
//       const commentsSnapshot = await getDocs(commentsQuery);
//       const commentsData = commentsSnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setComments(commentsData);

//       // Check if post is saved
//       const savedQuery = query(
//         collection(db, 'savedPosts'),
//         where('postId', '==', postId),
//         where('userId', '==', currentUser?.username)
//       );
//       const savedSnapshot = await getDocs(savedQuery);
//       setSaved(!savedSnapshot.empty);
//     } catch (error) {
//       console.error('Error fetching post data:', error);
//     }
//   };

//   const handleLike = async () => {
//     try {
//       const likeRef = doc(db, 'likes', `${postId}_${currentUser.username}`);
      
//       if (!liked) {
//         await setDoc(likeRef, {
//           postId,
//           userId: currentUser.username,
//           timestamp: serverTimestamp()
//         });
//         setLikeCount(prev => prev + 1);
//       } else {
//         await deleteDoc(likeRef);
//         setLikeCount(prev => prev - 1);
//       }
      
//       setLiked(!liked);
//     } catch (error) {
//       console.error('Error handling like:', error);
//     }
//   };

//   const handleComment = async () => {
//     if (newComment.trim()) {
//       try {
//         const commentRef = await addDoc(collection(db, 'comments'), {
//           postId,
//           userId: currentUser.username,
//           text: newComment,
//           timestamp: serverTimestamp()
//         });
        
//         setComments([...comments, {
//           id: commentRef.id,
//           username: currentUser.username,
//           text: newComment,
//           timestamp: new Date()
//         }]);
        
//         setNewComment('');
//       } catch (error) {
//         console.error('Error adding comment:', error);
//       }
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await deleteDoc(doc(db, 'comments', commentId));
//       setComments(comments.filter(comment => comment.id !== commentId));
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//     }
//   };

//   const handleSavePost = async () => {
//     try {
//       const saveRef = doc(db, 'savedPosts', `${postId}_${currentUser.username}`);
      
//       if (!saved) {
//         await setDoc(saveRef, {
//           postId,
//           userId: currentUser.username,
//           timestamp: serverTimestamp()
//         });
//       } else {
//         await deleteDoc(saveRef);
//       }
      
//       setSaved(!saved);
//     } catch (error) {
//       console.error('Error saving post:', error);
//     }
//   };

//   if (!currentUser || !randomPost) return null;

//   return (
//     <div className="w-full max-w-xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center p-3 space-x-3 border-b border-gray-700">
//         <img 
//           src={currentUser.photo} 
//           alt="Profile" 
//           className="w-10 h-10 rounded-full object-cover"
//         />
//         <div className="flex-1">
//           <p className="text-white text-sm font-medium">{currentUser.username}</p>
//           <p className="text-gray-400 text-xs">2 minutes ago</p>
//         </div>
//       </div>

//       {/* Post Content */}
//       <div className="relative aspect-square bg-black">
//         <img 
//           src={randomPost} 
//           alt="Post content" 
//           className="w-full h-full object-contain"
//         />
//       </div>

//       {/* Action Bar */}
//       <div className="p-3 border-t border-gray-700">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center space-x-4">
//             <button 
//               onClick={handleLike}
//               className="flex items-center space-x-1 text-gray-300 hover:text-white"
//             >
//               <Heart className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
//               <span className="text-sm">{likeCount}</span>
//             </button>
//             <button 
//               onClick={() => setIsCommenting(!isCommenting)}
//               className="flex items-center space-x-1 text-gray-300 hover:text-white"
//             >
//               <MessageCircle className="w-6 h-6" />
//               <span className="text-sm">{comments.length}</span>
//             </button>
//           </div>
//           <div className="flex items-center space-x-4">
//             <button 
//               onClick={handleSavePost}
//               className="text-gray-300 hover:text-white"
//             >
//               <Bookmark className={`w-6 h-6 ${saved ? 'fill-white' : ''}`} />
//             </button>
//             <button 
//               onClick={() => setShowShareList(!showShareList)}
//               className="text-gray-300 hover:text-white"
//             >
//               <Share2 className="w-6 h-6" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Comments Section */}
//       {isCommenting && (
//         <div className="p-3 border-t border-gray-700">
//           <div className="flex space-x-2">
//             <input
//               type="text"
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               placeholder="Add a comment..."
//               className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               onClick={handleComment}
//               className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Post
//             </button>
//           </div>
//           <div className="mt-3 space-y-2">
//             {comments.map((comment) => (
//               <div key={comment.id} className="flex justify-between items-start text-sm">
//                 <p className="text-white">
//                   <span className="font-medium">{comment.username}</span>
//                   <span className="ml-2">{comment.text}</span>
//                 </p>
//                 <button 
//                   onClick={() => handleDeleteComment(comment.id)}
//                   className="text-gray-400 hover:text-white text-xs"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Share List */}
//       {showShareList && (
//         <div className="max-h-60 overflow-y-auto border-t border-gray-700">
//           {users.map((user, i) => (
//             <div key={i} className="flex items-center space-x-3 p-3 hover:bg-gray-700 cursor-pointer">
//               <img 
//                 src={user.photo}
//                 alt="User" 
//                 className="w-8 h-8 rounded-full"
//               />
//               <span className="text-white text-sm">{user.username}</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }