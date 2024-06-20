import multer from 'multer';
import path from 'path';

const uploadDir = path.join(path.resolve(), '../public/uploads/');

const storage_config = multer.diskStorage({
    destination: (req,file,cb)=>{
        // cb(null,'/public/uploads'); // this public folder is the one which is the direct child of post-away directory
        cb(null,'../public/uploads');
    },
    filename: (req,file,cb)=>{
        const name = Date.now() + file.originalname;
        cb(null,name);
    }
});

export const uploadFile = multer({
    storage:storage_config,
});