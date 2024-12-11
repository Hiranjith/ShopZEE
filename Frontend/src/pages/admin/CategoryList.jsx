import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCreateCategoryMutation, useGetAllCategoriesQuery, useUpdateCategoryMutation, useDeleteCategoryMutation} from '../../redux/api/categoriesApiSlice';
import FormCategory from '../../components/FormCategory';
import Model from '../../components/Model';
import AdminMenu from './AdminMenu';



const CategoryList = () => {
    const { data: categories, refetch } = useGetAllCategoriesQuery();
    console.log(categories);

    const [name, setName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [modelVisible, setModelVisible] = useState(false);

    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    useEffect(() => {
        refetch()
    }, [refetch])

    const handleCreateCategory = async (e) => {
        e.preventDefault();

        if (!name) {
            toast.error("Please provide a category name");
            return; // Exit the function to prevent further execution
        }

        try {
            const res = await createCategory({ name }).unwrap();
            console.log(res);
            if (res) {
                setName('');
                toast.success(`Successfully created ${res.name}`);
                refetch();
            } else {
                toast.error('Category cannot be created at the moment, try again later');
            }
        } catch (error) {
            console.error(error);
            toast.error(`${name} already exists`);
            setName('');
        }
    };

    const updateHandler = async (e) => {
        e.preventDefault();

        if (!updatedName) {
            toast.error("Category name is required");
            return;
          }

          try {
            const res = await updateCategory({
                _id: selectedCategory._id,
                name: updatedName,
            }).unwrap()

            if(res.error){
                toast.error(res.error)
            }else{
                toast.success(`${res.name} updated successfully`)
                setSelectedCategory('');
                setUpdatedName('');
                setModelVisible(false);
                refetch();
            }
          } catch (error) {
            console.log(error);
            toast.error(`${updatedName} already exists`);
          }

    }

    const deleteHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await deleteCategory(selectedCategory._id).unwrap()
            if (res.error) {
                toast.error(res.error);
              } else {
                toast.success(`${res.name} is deleted.`);
                setSelectedCategory(null);
                setModelVisible(false);
                refetch();
              }
        } catch (error) {
            console.log(error);

            
        }
    }

    return (
        <div className="ml-[10rem] flex flex-col md:flex-row">
            <AdminMenu />
            <div className="md:w-3/4 p-3">
                <div className="h-12">Manage Category</div>
                <FormCategory
                    value={name}
                    setValue={setName}
                    handleSubmit={handleCreateCategory}
                    buttonText="Submit"
                />
                <br />
                <hr />

                <div className="flex flex-wrap">
                    {categories?.map((category) => (
                        <div key={category._id}>
                            <button
                                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                                onClick={() => {
                                    setModelVisible(true);
                                    setSelectedCategory(category);
                                    setUpdatedName(category.name)
                                }}
                            >
                                {category.name}
                            </button>


                        </div>
                    ))}
                </div>

                    <Model isOpen={modelVisible} onClose={() => setModelVisible(false)}>
                        <FormCategory 
                        value={updatedName} 
                        setValue={(value) => setUpdatedName(value)} 
                        handleSubmit={updateHandler} 
                        buttonText={'Update'} 
                        handleDelete={deleteHandler}/>
                    </Model>
            </div>
        </div>
    );
};

export default CategoryList;
