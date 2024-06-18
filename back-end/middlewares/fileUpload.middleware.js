import multer from 'multer';

const storage_config = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'../public/uploads/'); // this public folder is the one which is the direct child of post-away directory
    },
    filename: (req,file,cb)=>{
        const name = Date.now() + file.originalname;
        cb(null,name);
    }
});

export const uploadFile = multer({
    storage:storage_config,
});