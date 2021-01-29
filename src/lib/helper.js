const mapping = require('../mapping.json');
const rqKeys = Object.keys(mapping.rq);

const getRandom = (x) => {
    return Math.floor(Math.random() * x);
};

const checkTextKey = (text) => {
    const textKeyArray = rqKeys.filter(key => {
        const textInContent = mapping.rq[key].filter(item => item === text).length;
        return textInContent > 0 ? true : false;
    });

    return textKeyArray.length > 0 ? textKeyArray[0] : '';
};

const getType = (key) => {
    return mapping.rp[key] && mapping.rp[key].type || '';
};

const getReply = (key) => {
    const type = getType(key);
    let replyContent;
    const replyT = {
        type: 'text',
        text: mapping.rp[key].msg
    };

    switch (type) {
        case 'img':
            const length = mapping.rp[key].content.length;
            const imgID = mapping.rp[key].content[getRandom(length)];
            replyContent = {
				type: 'image',
				originalContentUrl: `https://i.imgur.com/${imgID}.jpg`,
				previewImageUrl: `https://i.imgur.com/${imgID}.jpg`,
			};
            break;
        case 'sticker':
            const content = mapping.rp[key].content[0];
            replyContent = {
                type: 'sticker',
                packageId: content[0],
                stickerId: content[1]
            };
            break;
        case 'text':
            break;
    }
    return [replyT, replyContent];
};

module.exports = {
    checkTextKey,
    getReply,
};