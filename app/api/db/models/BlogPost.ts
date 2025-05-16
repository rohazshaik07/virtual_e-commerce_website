import mongoose from "mongoose"

const BlogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a blog post title"],
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    slug: {
      type: String,
      required: [true, "Please provide a blog post slug"],
      unique: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: [true, "Please provide a blog post excerpt"],
      maxlength: [500, "Excerpt cannot be more than 500 characters"],
    },
    content: {
      type: String,
      required: [true, "Please provide blog post content"],
    },
    image: {
      type: String,
      required: [true, "Please provide a blog post image"],
    },
    author: {
      type: String,
      required: [true, "Please provide an author name"],
    },
    category: {
      type: String,
      required: [true, "Please provide a blog post category"],
    },
    tags: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema)
