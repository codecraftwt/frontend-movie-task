import React, { useEffect, useState } from 'react';
import { FaPlus, FaSignOutAlt } from 'react-icons/fa';
import { Card, Row, Col, Button, Pagination } from 'react-bootstrap';
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { RxExit } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const dummyMovies = [
    { id: 1, title: "Movie 1", year: 2020, img: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DW8GrXYyXYY0d5icMrHJqZ7VUHNcpu1zqt3MRNWYtRgLIRwlyoJEozgRnbhbIPIxoTT5DpRfaBt9X5nTMBYi0eL9Yb1MtGqv6NUKZ5B2Taj3zOt1JUcz~UrCe5H0bc83KDsc72CUq7Az3laq17VeRGc7bAEAuHI~Lh1orCnRJrXvz-OSy4jg4QFU88CKxzBRkFKmuhTmRQiSIAhmAUGjsYXQi3TvGaqrgBUWtJdFIa9LjVTn2vp2zGRvS81MtI0bu7vOVdWhr10WuThScMGwBwNn8p5h9Tw41Z8Cw2iRdtHKRqsjdQR77PC~mXejESbZT9NP-TRcLa7eNHcx6~I6Gg__" },
    { id: 2, title: "Movie 2", year: 2021, img: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DW8GrXYyXYY0d5icMrHJqZ7VUHNcpu1zqt3MRNWYtRgLIRwlyoJEozgRnbhbIPIxoTT5DpRfaBt9X5nTMBYi0eL9Yb1MtGqv6NUKZ5B2Taj3zOt1JUcz~UrCe5H0bc83KDsc72CUq7Az3laq17VeRGc7bAEAuHI~Lh1orCnRJrXvz-OSy4jg4QFU88CKxzBRkFKmuhTmRQiSIAhmAUGjsYXQi3TvGaqrgBUWtJdFIa9LjVTn2vp2zGRvS81MtI0bu7vOVdWhr10WuThScMGwBwNn8p5h9Tw41Z8Cw2iRdtHKRqsjdQR77PC~mXejESbZT9NP-TRcLa7eNHcx6~I6Gg__" },
    { id: 3, title: "Movie 3", year: 2020, img: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DW8GrXYyXYY0d5icMrHJqZ7VUHNcpu1zqt3MRNWYtRgLIRwlyoJEozgRnbhbIPIxoTT5DpRfaBt9X5nTMBYi0eL9Yb1MtGqv6NUKZ5B2Taj3zOt1JUcz~UrCe5H0bc83KDsc72CUq7Az3laq17VeRGc7bAEAuHI~Lh1orCnRJrXvz-OSy4jg4QFU88CKxzBRkFKmuhTmRQiSIAhmAUGjsYXQi3TvGaqrgBUWtJdFIa9LjVTn2vp2zGRvS81MtI0bu7vOVdWhr10WuThScMGwBwNn8p5h9Tw41Z8Cw2iRdtHKRqsjdQR77PC~mXejESbZT9NP-TRcLa7eNHcx6~I6Gg__" },
    { id: 4, title: "Movie 4", year: 2022, img: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DW8GrXYyXYY0d5icMrHJqZ7VUHNcpu1zqt3MRNWYtRgLIRwlyoJEozgRnbhbIPIxoTT5DpRfaBt9X5nTMBYi0eL9Yb1MtGqv6NUKZ5B2Taj3zOt1JUcz~UrCe5H0bc83KDsc72CUq7Az3laq17VeRGc7bAEAuHI~Lh1orCnRJrXvz-OSy4jg4QFU88CKxzBRkFKmuhTmRQiSIAhmAUGjsYXQi3TvGaqrgBUWtJdFIa9LjVTn2vp2zGRvS81MtI0bu7vOVdWhr10WuThScMGwBwNn8p5h9Tw41Z8Cw2iRdtHKRqsjdQR77PC~mXejESbZT9NP-TRcLa7eNHcx6~I6Gg__" },
    { id: 5, title: "Movie 5", year: 2019, img: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DW8GrXYyXYY0d5icMrHJqZ7VUHNcpu1zqt3MRNWYtRgLIRwlyoJEozgRnbhbIPIxoTT5DpRfaBt9X5nTMBYi0eL9Yb1MtGqv6NUKZ5B2Taj3zOt1JUcz~UrCe5H0bc83KDsc72CUq7Az3laq17VeRGc7bAEAuHI~Lh1orCnRJrXvz-OSy4jg4QFU88CKxzBRkFKmuhTmRQiSIAhmAUGjsYXQi3TvGaqrgBUWtJdFIa9LjVTn2vp2zGRvS81MtI0bu7vOVdWhr10WuThScMGwBwNn8p5h9Tw41Z8Cw2iRdtHKRqsjdQR77PC~mXejESbZT9NP-TRcLa7eNHcx6~I6Gg__" },
    { id: 6, title: "Movie 6", year: 2021, img: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DW8GrXYyXYY0d5icMrHJqZ7VUHNcpu1zqt3MRNWYtRgLIRwlyoJEozgRnbhbIPIxoTT5DpRfaBt9X5nTMBYi0eL9Yb1MtGqv6NUKZ5B2Taj3zOt1JUcz~UrCe5H0bc83KDsc72CUq7Az3laq17VeRGc7bAEAuHI~Lh1orCnRJrXvz-OSy4jg4QFU88CKxzBRkFKmuhTmRQiSIAhmAUGjsYXQi3TvGaqrgBUWtJdFIa9LjVTn2vp2zGRvS81MtI0bu7vOVdWhr10WuThScMGwBwNn8p5h9Tw41Z8Cw2iRdtHKRqsjdQR77PC~mXejESbZT9NP-TRcLa7eNHcx6~I6Gg__" },
    { id: 7, title: "Movie 7", year: 2020, img: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DW8GrXYyXYY0d5icMrHJqZ7VUHNcpu1zqt3MRNWYtRgLIRwlyoJEozgRnbhbIPIxoTT5DpRfaBt9X5nTMBYi0eL9Yb1MtGqv6NUKZ5B2Taj3zOt1JUcz~UrCe5H0bc83KDsc72CUq7Az3laq17VeRGc7bAEAuHI~Lh1orCnRJrXvz-OSy4jg4QFU88CKxzBRkFKmuhTmRQiSIAhmAUGjsYXQi3TvGaqrgBUWtJdFIa9LjVTn2vp2zGRvS81MtI0bu7vOVdWhr10WuThScMGwBwNn8p5h9Tw41Z8Cw2iRdtHKRqsjdQR77PC~mXejESbZT9NP-TRcLa7eNHcx6~I6Gg__" },
    { id: 8, title: "Movie 8", year: 2021, img: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DW8GrXYyXYY0d5icMrHJqZ7VUHNcpu1zqt3MRNWYtRgLIRwlyoJEozgRnbhbIPIxoTT5DpRfaBt9X5nTMBYi0eL9Yb1MtGqv6NUKZ5B2Taj3zOt1JUcz~UrCe5H0bc83KDsc72CUq7Az3laq17VeRGc7bAEAuHI~Lh1orCnRJrXvz-OSy4jg4QFU88CKxzBRkFKmuhTmRQiSIAhmAUGjsYXQi3TvGaqrgBUWtJdFIa9LjVTn2vp2zGRvS81MtI0bu7vOVdWhr10WuThScMGwBwNn8p5h9Tw41Z8Cw2iRdtHKRqsjdQR77PC~mXejESbZT9NP-TRcLa7eNHcx6~I6Gg__" },
    { id: 9, title: "Movie 9", year: 2021, img: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DW8GrXYyXYY0d5icMrHJqZ7VUHNcpu1zqt3MRNWYtRgLIRwlyoJEozgRnbhbIPIxoTT5DpRfaBt9X5nTMBYi0eL9Yb1MtGqv6NUKZ5B2Taj3zOt1JUcz~UrCe5H0bc83KDsc72CUq7Az3laq17VeRGc7bAEAuHI~Lh1orCnRJrXvz-OSy4jg4QFU88CKxzBRkFKmuhTmRQiSIAhmAUGjsYXQi3TvGaqrgBUWtJdFIa9LjVTn2vp2zGRvS81MtI0bu7vOVdWhr10WuThScMGwBwNn8p5h9Tw41Z8Cw2iRdtHKRqsjdQR77PC~mXejESbZT9NP-TRcLa7eNHcx6~I6Gg__" },
    { id: 10, title: "Movie 10", year: 2019, img: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DW8GrXYyXYY0d5icMrHJqZ7VUHNcpu1zqt3MRNWYtRgLIRwlyoJEozgRnbhbIPIxoTT5DpRfaBt9X5nTMBYi0eL9Yb1MtGqv6NUKZ5B2Taj3zOt1JUcz~UrCe5H0bc83KDsc72CUq7Az3laq17VeRGc7bAEAuHI~Lh1orCnRJrXvz-OSy4jg4QFU88CKxzBRkFKmuhTmRQiSIAhmAUGjsYXQi3TvGaqrgBUWtJdFIa9LjVTn2vp2zGRvS81MtI0bu7vOVdWhr10WuThScMGwBwNn8p5h9Tw41Z8Cw2iRdtHKRqsjdQR77PC~mXejESbZT9NP-TRcLa7eNHcx6~I6Gg__" },
    { id: 11, title: "Movie 11", year: 2022, img: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DW8GrXYyXYY0d5icMrHJqZ7VUHNcpu1zqt3MRNWYtRgLIRwlyoJEozgRnbhbIPIxoTT5DpRfaBt9X5nTMBYi0eL9Yb1MtGqv6NUKZ5B2Taj3zOt1JUcz~UrCe5H0bc83KDsc72CUq7Az3laq17VeRGc7bAEAuHI~Lh1orCnRJrXvz-OSy4jg4QFU88CKxzBRkFKmuhTmRQiSIAhmAUGjsYXQi3TvGaqrgBUWtJdFIa9LjVTn2vp2zGRvS81MtI0bu7vOVdWhr10WuThScMGwBwNn8p5h9Tw41Z8Cw2iRdtHKRqsjdQR77PC~mXejESbZT9NP-TRcLa7eNHcx6~I6Gg__" },
    { id: 12, title: "Movie 12", year: 2021, img: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DW8GrXYyXYY0d5icMrHJqZ7VUHNcpu1zqt3MRNWYtRgLIRwlyoJEozgRnbhbIPIxoTT5DpRfaBt9X5nTMBYi0eL9Yb1MtGqv6NUKZ5B2Taj3zOt1JUcz~UrCe5H0bc83KDsc72CUq7Az3laq17VeRGc7bAEAuHI~Lh1orCnRJrXvz-OSy4jg4QFU88CKxzBRkFKmuhTmRQiSIAhmAUGjsYXQi3TvGaqrgBUWtJdFIa9LjVTn2vp2zGRvS81MtI0bu7vOVdWhr10WuThScMGwBwNn8p5h9Tw41Z8Cw2iRdtHKRqsjdQR77PC~mXejESbZT9NP-TRcLa7eNHcx6~I6Gg__" },
    { id: 13, title: "Movie 13", year: 2020, img: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DW8GrXYyXYY0d5icMrHJqZ7VUHNcpu1zqt3MRNWYtRgLIRwlyoJEozgRnbhbIPIxoTT5DpRfaBt9X5nTMBYi0eL9Yb1MtGqv6NUKZ5B2Taj3zOt1JUcz~UrCe5H0bc83KDsc72CUq7Az3laq17VeRGc7bAEAuHI~Lh1orCnRJrXvz-OSy4jg4QFU88CKxzBRkFKmuhTmRQiSIAhmAUGjsYXQi3TvGaqrgBUWtJdFIa9LjVTn2vp2zGRvS81MtI0bu7vOVdWhr10WuThScMGwBwNn8p5h9Tw41Z8Cw2iRdtHKRqsjdQR77PC~mXejESbZT9NP-TRcLa7eNHcx6~I6Gg__" },
    { id: 14, title: "Movie 14", year: 2021, img: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DW8GrXYyXYY0d5icMrHJqZ7VUHNcpu1zqt3MRNWYtRgLIRwlyoJEozgRnbhbIPIxoTT5DpRfaBt9X5nTMBYi0eL9Yb1MtGqv6NUKZ5B2Taj3zOt1JUcz~UrCe5H0bc83KDsc72CUq7Az3laq17VeRGc7bAEAuHI~Lh1orCnRJrXvz-OSy4jg4QFU88CKxzBRkFKmuhTmRQiSIAhmAUGjsYXQi3TvGaqrgBUWtJdFIa9LjVTn2vp2zGRvS81MtI0bu7vOVdWhr10WuThScMGwBwNn8p5h9Tw41Z8Cw2iRdtHKRqsjdQR77PC~mXejESbZT9NP-TRcLa7eNHcx6~I6Gg__" },
    { id: 15, title: "Movie 15", year: 2022, img: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DW8GrXYyXYY0d5icMrHJqZ7VUHNcpu1zqt3MRNWYtRgLIRwlyoJEozgRnbhbIPIxoTT5DpRfaBt9X5nTMBYi0eL9Yb1MtGqv6NUKZ5B2Taj3zOt1JUcz~UrCe5H0bc83KDsc72CUq7Az3laq17VeRGc7bAEAuHI~Lh1orCnRJrXvz-OSy4jg4QFU88CKxzBRkFKmuhTmRQiSIAhmAUGjsYXQi3TvGaqrgBUWtJdFIa9LjVTn2vp2zGRvS81MtI0bu7vOVdWhr10WuThScMGwBwNn8p5h9Tw41Z8Cw2iRdtHKRqsjdQR77PC~mXejESbZT9NP-TRcLa7eNHcx6~I6Gg__" },
    { id: 16, title: "Movie 16", year: 2023, img: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DW8GrXYyXYY0d5icMrHJqZ7VUHNcpu1zqt3MRNWYtRgLIRwlyoJEozgRnbhbIPIxoTT5DpRfaBt9X5nTMBYi0eL9Yb1MtGqv6NUKZ5B2Taj3zOt1JUcz~UrCe5H0bc83KDsc72CUq7Az3laq17VeRGc7bAEAuHI~Lh1orCnRJrXvz-OSy4jg4QFU88CKxzBRkFKmuhTmRQiSIAhmAUGjsYXQi3TvGaqrgBUWtJdFIa9LjVTn2vp2zGRvS81MtI0bu7vOVdWhr10WuThScMGwBwNn8p5h9Tw41Z8Cw2iRdtHKRqsjdQR77PC~mXejESbZT9NP-TRcLa7eNHcx6~I6Gg__" },
];
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const moviesPerPage = 8;
    
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if(token){
            fetchMovies();
        }else{
            navigate('/')
        }
    }, []);
    const fetchMovies = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/movies`);
            console.log(response,'response');
            if(response.data.length!=0){
                setMovies(response.data);
            }else{
                navigate('/empty-state')
            }
            // setMovies(dummyMovies);
            // setLoading(false);
        } catch (error) {
            console.error('Error fetching movies:', error);
            // setLoading(false);
        }
    };

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    const totalPages = Math.ceil(movies.length / moviesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/api/movies/${id}`);
            console.log('Movie deleted successfully', response);
            fetchMovies()
            // navigate('/'); 
        } catch (error) {
            console.error('Error deleting movie:', error);
            setError('Failed to delete the movie. Please try again.');
        }
    };
    const handleLogout = ()=>{
        localStorage.removeItem('authToken')
        navigate('/')
    }
    

    return (
        <div className="container mt-5">
            {/* Top Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="d-flex align-items-center custome-h2"
                >
                    My Movies
                    <IoIosAddCircleOutline onClick={() => navigate('/create-movie')} className="ms-2" style={{ cursor: 'pointer', width: '32px', height: '32px' }} />
                </h2>
                <div className="d-flex align-items-center">
                    <Button className="text-light bg-transparent border-0 d-flex align-items-center" onClick={()=>handleLogout()}>
                        <spam className="logoutlabel">Logout</spam> <RxExit style={{ width: '32px', height: '32px' }} />
                    </Button>
                </div>
            </div>

            {/* Movie Cards */}
            <Row xs={2} sm={2} md={3} lg={4} className="g-4">
                {currentMovies.map((movie) => (
                    <Col key={movie._id}>
                        <Card className='card'>
                            <Card.Img variant="top" src={movie.movie_img} style={{
                                height: '400px',
                                borderRadius: ' 12px',
                            }} />
                            <Card.Body style={{
                                color: ' #fff',
                                paddingLeft: '2px',
                            }}>
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text>{movie.year}</Card.Text>
                                <div className=' d-flex justify-content-between'>
                                    <CiEdit style={{cursor:'pointer'}} onClick={() => navigate(`/edit/${movie._id}`)} />
                                    <MdDelete style={{cursor:'pointer'}} onClick={() => handleDelete(movie._id)}/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Custom Pagination */}
            <div className="d-flex justify-content-center mt-4">
                <Pagination className="custom-pagination">
                    <Pagination.Prev onClick={handlePrevPage} className="pagination-prev" />
                    {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                            className="pagination-item"
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={handleNextPage} className="pagination-next" />
                </Pagination>
            </div>
        </div>
    );
}

export default MovieList;
