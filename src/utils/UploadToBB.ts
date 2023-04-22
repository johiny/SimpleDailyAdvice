async function uploadImageToImgbb(img : string) {
    const formData = new FormData();
    img = img.replace('data:image/png;base64,', '');
    console.log(img)
    formData.append("image", img);
    const response = await fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
      method: "POST",
      body: formData
    });
  
    const data = await response.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error(data.error.message);
    }
  }

export default uploadImageToImgbb  