import {tweetsData} from '/data.js'

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener("click",(e)=>{

    if(e.target.dataset.like)
    {
        handleLikeClick(e.target.dataset.like)
    }
    else if(e.target.dataset.retweet)
    {
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply)
    {
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn')
    {
        handleTweetBtnClick()
    }

})


function handleTweetBtnClick()
{

    const tweetInputValue = document.getElementById('tweet-input').value

    if(tweetInputValue)
    {
        tweetsData.unshift({
            handle: `@Faizanshaikh12 ✅`,
            profilePic: `images/faizan.png`,
            likes: 0,
            retweets: 0,
            tweetText: `${tweetInputValue}`,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
        })
    }

    render()

}


function handleReplyClick(tweetId)
{

    document.getElementById(`reply-${tweetId}`).classList.toggle('hidden')

}


function handleRetweetClick(tweetId)
{

    const tweetObject = tweetsData.filter((tweet)=>{
        return tweet.uuid === tweetId
    })[0]

    if(tweetObject.isRetweeted)
    {
        tweetObject.retweets --
    }
    else
    {
        tweetObject.retweets ++
    }

    tweetObject.isRetweeted = !tweetObject.isRetweeted

    render()
    
}


function handleLikeClick(tweetId)
{

    const tweetObject = tweetsData.filter((tweet)=>{
        return tweet.uuid === tweetId
    })[0]

    if(tweetObject.isLiked)
    {
        tweetObject.likes --
    }
    else
    {
        tweetObject.likes ++
    }

    tweetObject.isLiked = !tweetObject.isLiked

    render()

}


function render()
{

    const tweetsContainerEl = document.getElementById('tweets-container')

    tweetsContainerEl.innerHTML = getHtmlString()

}


render()


function getHtmlString()
{

    let htmlString = ''

    tweetsData.forEach((tweet)=>{

        let isLikedClass = ''
    
        let isRetweetedClass = ''

        let repliesString = ''

        if(tweet.isLiked)
        {
            isLikedClass = 'liked'
        }

        if(tweet.isRetweeted)
        {
            isRetweetedClass = 'retweeted'
        }

        if(tweet.replies.length)
        {
            tweet.replies.forEach((reply)=>{
                repliesString += 
                `
                    <div class="reply-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="tweet-handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
                `
            })
        }

        htmlString += 
        `
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="tweet-handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span>
                            <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                            ${tweet.replies.length}
                        </span>
                        <span>
                            <i class="fa-solid fa-heart  ${isLikedClass}" data-like="${tweet.uuid}"></i>
                            ${tweet.likes}
                        </span>
                        <span>
                            <i class="fa-solid fa-retweet ${isRetweetedClass}" data-retweet="${tweet.uuid}"></i>
                            ${tweet.retweets}
                        </span>
                    </div>
                </div>
            </div>
            <div id = "reply-${tweet.uuid}" class="replies-container hidden">
                ${repliesString}
            </div>
        `
    })

    return htmlString

}


