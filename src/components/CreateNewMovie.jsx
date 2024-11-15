import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CreateNewMovie() {
    const { id } = useParams(); 
    const navigate = useNavigate(); 

    const [movieTitle, setMovieTitle] = useState('');
    const [publishingYear, setPublishingYear] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            // Fetch the movie details if in edit mode
            const fetchMovie = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/api/movies/${id}`);
                    console.log(response,'response');
                    
                    const fetchedMovie = response.data
                    

                    // Check if the fetched movie exists and matches the id
                    if (fetchedMovie && fetchedMovie._id === id) {
                        setMovieTitle(fetchedMovie.title);
                        setPublishingYear(fetchedMovie.year);
                        setImage(fetchedMovie.movie_img);
                    } else {
                        throw new Error('Movie not found with the given id');
                    }
                } catch (error) {
                    setError('Failed to fetch movie details: ' + error.message);
                }
            };
            fetchMovie();
        }
    }, [id]);

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleImageUpload(file);
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        handleImageUpload(file);
    };

    const handleImageUpload = (file) => {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (file && validTypes.includes(file.type)) {
            setImage(file); // Store the actual image file, not just the URL
            setError('');
        } else {
            setError('Please select a valid image (JPG, PNG, or GIF).');
        }
    };

    // const handleSubmit = async(e) => {
    //     e.preventDefault();

    //     if (!movieTitle || !publishingYear || !image) {
    //         setError('Please fill in all fields and upload an image.');
    //         return;
    //     }

    //     setError('');
    //     const movieData = {
    //         title: movieTitle,
    //         year: publishingYear,
    //         image: image, // You might want to upload the image to a server and get the URL
    //     };
    //     console.log(movieData,'movieData');
        
    //     // try {
    //     //     if (isEditMode) {
                
    //     //         const response = await axios.put(`${API_BASE_URL}/api/movies/${id}`, movieData);
    //     //         console.log(response,'response');
                
    //     //         console.log('Movie Updated:', { id, movieTitle, publishingYear, image });
    //     //     } else {
                
    //     //         const response = await axios.post(`${API_BASE_URL}/api/movies/create`, movieData);

    //     //         console.log('New Movie Added:', { movieTitle, publishingYear, image });
    //     //     }

    //     //     setMovieTitle('');
    //     //     setPublishingYear('');
    //     //     setImage(null);
    //     //     navigate('/'); 
    //     // } catch (error) {
    //     //     setError('An error occurred: ' + error.message);
    //     // }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!movieTitle || !publishingYear || !image) {
            setError('Please fill in all fields and upload an image.');
            return;
        }

        setError('');

        const formData = new FormData();
        formData.append('title', movieTitle);
        formData.append('year', publishingYear);
        formData.append('movie_img', image); // Append the image file to FormData

        try {
            let response;

            // If editing a movie, update it, otherwise create a new movie
            if (isEditMode) {
                response = await axios.put(`${API_BASE_URL}/api/movies/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Movie Updated:', response.data);
            } else {
                response = await axios.post(`${API_BASE_URL}/api/movies/create`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('New Movie Added:', response.data);
            }

            // Clear the form fields and navigate
            setMovieTitle('');
            setPublishingYear('');
            setImage(null);
            navigate('/');
        } catch (error) {
            setError('An error occurred: ' + error.message);
        }
    };
    return (
        <div className="row w-100 ">
            <div className="col-12">
                <h2
                    className="mb-4 create-movie-header"
                >
                    {isEditMode ? 'Edit Movie' : 'Create a new movie'}
                </h2>
            </div>

            <div className="col-12">
                <div className="row reverse">
                    {/* Left Column */}
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <div className="text-center">
                            <div
                                className="d-flex justify-content-center align-items-center drag-img-section"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                            >
                                {image ? (
                                    <img
                                        src={image}
                                        alt="Preview"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <span style={{ color: '#fff' }}>Drag an image here</span>
                                )}
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageSelect}
                                style={{ display: 'none' }}
                                id="fileInput"
                            />
                            <label htmlFor="fileInput" style={{ cursor: 'pointer', marginTop: '10px' }}>
                                Or click here to select an image
                            </label>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-md-6">
                        <div className="p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control movie-title"
                                        placeholder="Title"
                                        id="movieTitle"
                                        value={movieTitle}
                                        onChange={(e) => setMovieTitle(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="number"
                                        className="form-control publish-year"
                                        placeholder="Publishing year"
                                        id="publishingYear"
                                        value={publishingYear}
                                        onChange={(e) => setPublishingYear(e.target.value)}
                                        required
                                    />
                                </div>

                                {error && <div className="alert alert-danger">{error}</div>}

                                <div className="d-flex custome-btns ">
                                    <button
                                        type="button"
                                        className="btn"
                                        style={{
                                            width: '167px',
                                            height: '56px',
                                            borderRadius: '10px',
                                            border: '1px solid #fff',
                                            color: '#fff',
                                            fontFamily: 'Montserrat',
                                            fontWeight: '700',
                                            fontSize: '16px',
                                        }}
                                        onClick={() => {
                                            setMovieTitle('');
                                            setPublishingYear('');
                                            setImage(null);
                                            setError('');
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn"
                                        style={{
                                            marginLeft: '10px',
                                            width: '167px',
                                            height: '56px',
                                            borderRadius: '10px',
                                            border: '1px solid #2BD17E',
                                            color: '#fff',
                                            fontFamily: 'Montserrat',
                                            fontWeight: '700',
                                            fontSize: '16px',
                                            background: '#2BD17E',
                                        }}
                                    >
                                        {isEditMode ? 'Update' : 'Submit'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateNewMovie;
