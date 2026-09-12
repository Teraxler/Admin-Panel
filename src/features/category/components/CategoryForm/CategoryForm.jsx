import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { categorySchema } from "./categoryFormValidation";

function CategoryForm({ category: categoryData, onSubmit, isEditMode }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categoryName, setCategoryName] = useState(categoryData?.name || "");

  async function handleSubmitForm(e) {
    e.preventDefault();
    setIsSubmitting(true);

    const { success, error } = categorySchema.safeParse({ categoryName });

    if (success) await onSubmit({ ...categoryData, name: categoryName });
    if (!success) toast.error(error.issues[0].message);

    setIsSubmitting(false);
  }

  return (
    <form
      className="w-full bg-white p-2.5 sm:px-4 py-4 mt-8 rounded-lg shadow text-sm font-medium"
      onSubmit={handleSubmitForm}
    >
      <div className="flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-8 leading-6">
        <div className="flex gap-x-2 sm:gap-x-4">
          <div className="w-1/2">
            <label htmlFor="categoryName">Category</label>
            <input
              id="categoryName"
              type="text"
              placeholder="Cold Coffee"
              className="input"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-x-2 mt-10 sm:mt-25">
        <button
          disabled={isSubmitting}
          className="btn btn--small btn--secondary"
          type="submit"
        >
          {isSubmitting ? "Submitting" : isEditMode ? "Update" : "Create"}
        </button>
        <Link href={"/categories"}>
          <button type="button" className="btn btn--small btn--secondary">
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
}

export default CategoryForm;
