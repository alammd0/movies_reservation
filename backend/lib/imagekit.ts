import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT as string,
})


const uploadImage = async (file : File) => {
    try{
        const buffer = Buffer.from(await file.arrayBuffer());
        const response = await imagekit.upload({
            file : buffer, 
            fileName : file.name
        });

        return response.url;
    }
    catch(err){
        console.log(err);
    }
}

export default uploadImage;