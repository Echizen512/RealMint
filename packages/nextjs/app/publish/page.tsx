"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle, DollarSign, ImageIcon, Upload, X } from "lucide-react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";

const categories = ["Real Estate", "Collectibles", "Commodities", "Vehicles", "Art", "Other"];

interface FormData {
  title: string;
  description: string;
  category: string;
  location: string;
  price: string;
  totalTokens: string;
  images: File[];
  terms: boolean;
}

interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
  location?: string;
  price?: string;
  totalTokens?: string;
  images?: string;
  terms?: string;
}

export default function PublishPage() {
  //states
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    location: "",
    price: "",
    totalTokens: "",
    images: [],
    terms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  //Smart contract
  const { writeContractAsync: writeMarketPlaceAsync } = useScaffoldWriteContract({
    contractName: "RealMintMarketplace",
  });

  //functions
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Asset title is required";
    } else if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (Number.parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.totalTokens) {
      newErrors.totalTokens = "Total tokens is required";
    } else if (Number.parseInt(formData.totalTokens) <= 0) {
      newErrors.totalTokens = "Total tokens must be greater than 0";
    }

    if (formData.images.length === 0) {
      newErrors.images = "At least one image is required";
    }

    if (!formData.terms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    const newImages = Array.from(files).filter(file => {
      return file.type.startsWith("image/") && file.size <= 2 * 1024 * 1024; // 2MB limit
    });

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 5), // Max 5 images
    }));

    if (errors.images) {
      setErrors(prev => ({ ...prev, images: undefined }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const uploadedImageUrls: string[] = [];

      // Subir cada imagen al backend
      for await (const imageFile of formData.images) {
        const imageFormData = new FormData();
        imageFormData.append("file", imageFile);

        const response = await fetch("api/upload-image", {
          method: "POST",
          body: imageFormData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const result = await response.json();
        console.log(result);
        uploadedImageUrls.push(result.url);
      }

      writeMarketPlaceAsync({
        functionName: "publishAsset",
        args: [
          formData.title,
          formData.description,
          formData.category,
          formData.location,
          uploadedImageUrls,
          BigInt(formData.price),
          BigInt(formData.totalTokens),
        ],
      });

      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          title: "",
          description: "",
          category: "",
          location: "",
          price: "",
          totalTokens: "",
          images: [],
          terms: false,
        });
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const formatPrice = (price: string) => {
    const num = Number.parseFloat(price);
    if (isNaN(num)) return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <h2 className="card-title text-2xl justify-center mb-2">Asset Listed Successfully!</h2>
            <p className="text-base-content/70 mb-6">
              Your asset has been submitted for review and will be available in the marketplace soon.
            </p>
            <div className="card-actions justify-center">
              <Link href="/" className="btn btn-primary">
                View Marketplace
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">Publish Asset</h1>
          <p className="text-base-content/70">List your real-world asset for tokenized trading</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Asset Details */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                <DollarSign className="w-5 h-5 text-primary" />
                Asset Details
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label" htmlFor="title">
                      <span className="label-text">Asset Title *</span>
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={formData.title}
                      onChange={e => handleInputChange("title", e.target.value)}
                      placeholder="e.g., Manhattan Luxury Apartment"
                      className={`input input-bordered w-full rounded-lg ${errors.title ? "input-error" : ""}`}
                    />
                    {errors.title && (
                      <label className="label">
                        <span className="label-text-alt text-error flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.title}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label" htmlFor="category">
                      <span className="label-text">Category *</span>
                    </label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={e => handleInputChange("category", e.target.value)}
                      className={`select select-bordered w-full rounded-lg ${errors.category ? "select-error" : ""}`}
                    >
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <label className="label">
                        <span className="label-text-alt text-error flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.category}
                        </span>
                      </label>
                    )}
                  </div>
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="description">
                    <span className="label-text">Description *</span>
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={e => handleInputChange("description", e.target.value)}
                    placeholder="Provide a detailed description of your asset..."
                    rows={4}
                    className={`textarea textarea-bordered w-full rounded-lg ${errors.description ? "textarea-error" : ""}`}
                  />
                  <label className="label">
                    <span className="label-text-alt">{formData.description.length}/500 characters</span>
                    {errors.description && (
                      <span className="label-text-alt text-error flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.description}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="location">
                    <span className="label-text">Location *</span>
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={e => handleInputChange("location", e.target.value)}
                    placeholder="e.g., New York, NY"
                    className={`input input-bordered w-full rounded-lg ${errors.location ? "input-error" : ""}`}
                  />
                  {errors.location && (
                    <label className="label">
                      <span className="label-text-alt text-error flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.location}
                      </span>
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Tokenization */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                <DollarSign className="w-5 h-5 text-primary" />
                Pricing & Tokenization
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label" htmlFor="price">
                      <span className="label-text">Total Asset Value (USDC) *</span>
                    </label>
                    <input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={e => handleInputChange("price", e.target.value)}
                      placeholder="0"
                      className={`input input-bordered w-full rounded-lg ${errors.price ? "input-error" : ""}`}
                    />
                    {formData.price && (
                      <label className="label">
                        <span className="label-text-alt text-primary font-medium">{formatPrice(formData.price)}</span>
                      </label>
                    )}
                    {errors.price && (
                      <label className="label">
                        <span className="label-text-alt text-error flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.price}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label" htmlFor="totalTokens">
                      <span className="label-text">Total Tokens *</span>
                    </label>
                    <input
                      id="totalTokens"
                      type="number"
                      value={formData.totalTokens}
                      onChange={e => handleInputChange("totalTokens", e.target.value)}
                      placeholder="1000"
                      className={`input input-bordered w-full rounded-lg ${errors.totalTokens ? "input-error" : ""}`}
                    />
                    {formData.price && formData.totalTokens && (
                      <label className="label">
                        <span className="label-text-alt">
                          Price per token:{" "}
                          {formatPrice(
                            (Number.parseFloat(formData.price) / Number.parseInt(formData.totalTokens)).toString(),
                          )}
                        </span>
                      </label>
                    )}
                    {errors.totalTokens && (
                      <label className="label">
                        <span className="label-text-alt text-error flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.totalTokens}
                        </span>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                <ImageIcon className="w-5 h-5 text-primary" />
                Asset Images *
              </h2>
              <div className="space-y-6">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                    dragActive
                      ? "border-primary bg-primary/5"
                      : errors.images
                        ? "border-error"
                        : "border-base-300 hover:border-primary/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 text-base-content/50 mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Drop images here or click to upload</p>
                  <p className="text-sm text-base-content/70 mb-4">
                    Support: JPG, PNG, GIF up to 2MB each (Max 5 images)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={e => handleImageUpload(e.target.files)}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="btn btn-outline cursor-pointer">
                    Choose Files
                  </label>
                </div>

                {errors.images && (
                  <div className="text-sm text-error flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.images}
                  </div>
                )}

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image) || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-base-300"
                        />
                        <button
                          type="button"
                          className="btn btn-error btn-xs absolute -top-2 -right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="space-y-6">
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.terms}
                      onChange={e => handleInputChange("terms", e.target.checked)}
                      className="checkbox checkbox-primary"
                    />
                    <span className="label-text">
                      I agree to the{" "}
                      <Link href="/terms" className="link link-primary">
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="link link-primary">
                        Privacy Policy
                      </Link>
                      *
                    </span>
                  </label>
                  {errors.terms && (
                    <label className="label">
                      <span className="label-text-alt text-error flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.terms}
                      </span>
                    </label>
                  )}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg w-full">
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <span className="loading loading-spinner loading-sm"></span>
                      Publishing Asset...
                    </div>
                  ) : (
                    "Publish Asset"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
