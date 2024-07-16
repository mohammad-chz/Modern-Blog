import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            default: 'https://www.karlancer.com/blog/wp-content/uploads/2022/04/blog-post-2.png',
        },
        category: {
            type: String,
            default: 'uncategorized'
        },
        slug: {
            type: String,
            required: true,
            unique: true
        }
    }, { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;