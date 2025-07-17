import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true }
});

const testimonialSchema = new mongoose.Schema(
  {
    quote: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    results: [resultSchema],
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;