import React from 'react';

const aboutBilly = [
    'Billy Collopy is an award-winning photographer and lifelong resident of Southern California. Billy’s passion for photography started at an early age. What began as a childhood pastime soon developed into a serious hobby in his high school’s photography class darkroom.',
    'After learning the basic camera mechanics and photographic composition, the new challenges presented in the darkroom were where he really began to push his creativity. After high school, he continued to take photographs in college, but without access to the creative possibilities that come with a darkroom, he focused on golf and his love of snow sports.',
    'The digital photography revolution and the resulting artistic image processing were what really brought him back to photography. With an understanding of the old techniques of dodging and burning, Photoshop layers and masking finally allowed him to bring his unique vision back to his photographs.',
    'As he continued to develop his skills behind the lens, and the technology of drones advanced, Billy decided to get into aerial photography. The basic mechanics of photography carry over well, and a whole new interest was born. Soon after learning how to fly, the drone quickly became a new member of the camera kit.',
    'As opportunities arose to travel more, trip planning soon developed into planning photo shoots around the perfect time to arrive at the chosen location. The result is early mornings and late evenings spent watching the sun rise and set over some amazing destinations.',
    'When Billy isn’t behind the lens, he can be found on his mountain bike or planning his next ski or dive trip with his wife, Angela. They are both passionate about travel and experiencing new cultures and cuisines around the world.',
    'Follow Billy as he travels the World. Whether it’s from his Sony mirrorless, underwater housing, or his drone, Billy will continue to search for the perfect shot.'
    ];

let blurb = []
for (let i = 0; i < aboutBilly.length; i ++ ){
    blurb.push(<p className='txtBlog'>{aboutBilly[i]}</p>)
}

function About() {
    return (
        <div className='blogPostContainer'>
            {blurb}
        </div>
    )
}

export {About}