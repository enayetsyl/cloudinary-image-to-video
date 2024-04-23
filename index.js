const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: 'dj3qabx11',
    api_key: '533762782692462',
    api_secret: 'YcvSAvEFsEu-rZyhKmLnI3bQ5KQ'
});


const images = [];

// async function uploadImages() {
//   try {
//     const image1 = await cloudinary.uploader.upload('https://t4.ftcdn.net/jpg/05/32/48/97/360_F_532489763_8aD8Xnavb9zGlwR0MwSUtd7UHGZ5v4y9.jpg', {
//       public_id: 'image1',
//       tags: 'animation'
//     });
//     images.push(image1.public_id);

//     const image2 = await cloudinary.uploader.upload('https://jpeg.org/images/jpeg2000-home.jpg', {
//       public_id: 'image2',
//       tags: 'animation'
//     });
//     images.push(image2.public_id);

//     const image3 = await cloudinary.uploader.upload('https://jpeg.org/images/jpeg2000-home.jpg', {
//       public_id: 'image3',
//       tags: 'animation'
//     });
//     images.push(image3.public_id);
//   } catch (err) {
//     console.log(err);
    
//   }
// }

async function uploadArrowsRight() {
  try {
    const arrowsRight = await cloudinary.uploader.upload('https://t4.ftcdn.net/jpg/05/32/48/97/360_F_532489763_8aD8Xnavb9zGlwR0MwSUtd7UHGZ5v4y9.jpg', {
      public_id: 'arrows_right',
      tags: 'arrow_animation'
    });
    // console.log(arrowsRight);
  } catch (err) {
    console.log(err);
  }
}

async function generateFrames() {
  const frames = [];
  for (let x = -5; x <= 1; x++) {
    const url = 'https://jpeg.org/images/jpeg2000-home.jpg';
    try {
      const frame = await cloudinary.uploader.upload(url, {
        public_id: `arrow_animation_${x}`,
        tags: "arrow_animation",
        transformation: [
          { width: 280, height: 150, gravity: "west", crop: "pad" },
          {
            overlay: "arrows_right",
            x: x * 10,
            y: 0,
            gravity: "west",
            effect: x > 7 ? `brightness:${(x - 7) * 4}` : null
          }
        ]
      });
      frames.push(frame.public_id);
    } catch (err) {
      console.log(err);
    }
  }
  return frames;
}




async function generateGif() {
  // await uploadImages();
  await uploadArrowsRight();
  const frames = await generateFrames();
  const gifUrl = cloudinary.url({
    transformation: {
      width: 300,
      height: 200,
      crop: "crop",
      gravity: "center"
    },
    format: "gif",
    delay: 10, // optional, sets the delay between frames in ms
    multi: { tag: "arrow_animation", public_ids: frames } // use the frames array here!
  });
  console.log('gif url', gifUrl);
  console.log('frames', frames);
  // console.log('public id', images);
}

generateGif();