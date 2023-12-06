import axios from "axios";

export const getMovies = async () => {
    const res = await axios.get("/movie").catch((e) => {
        console.log(e);
    })
    if (res.status !== 200) {
        return console.log("No data");
    }
    const data = await res.data;
    return data;
}

export const sendUsers = async (datas, signup) => {
    const res = await axios.post(`/user/${signup ? "signup" : "login"}`, {
        name: signup ? datas.name : "",
        email: datas.email,
        password: datas.password
    }
    ).catch((e) => {
        console.log(e);
    })

    if (res.status !== 200) {
        console.log("Unexpected error");
    }
    const resdata = await res.data;
    return resdata;
}

export const adminreq = async (datas) => {
    const res = await axios.post("/admin/login", {
        email: datas.email,
        password: datas.password
    })
        .catch((e) => console.log(e));
    if (res.status !== 200) {
        return console.log("Unexpected error");
    }
    const resdata = await res.data;
    console.log(resdata);
    return resdata;

}

export const getMovieDetails = async (id) => {
    const res = await axios.get(`/movie/${id}`).catch((e) => console.log(e));
    if (res.status !== 200) {
        return console.log("Unexpected error");
    }
    const data = await res.data;
    return data;
}

export const addBookings = async (datas) => {
    const res = await axios.post("/booking/", {
        movie: datas.movie,
        seatNumber: datas.seatNumber,
        date: datas.date,
        user: localStorage.getItem("userId"),
    }).catch((e) => console.log(e));
    if (res.status !== 200) {
        return console.log("Unexpected error");
    }
    const data = await res.data;
    return data;
}

export const getUserBooking = async () => {
    const id = localStorage.getItem("userId");
    const res = await axios.get(`user/getbookings/${id}`)
        .catch((err) => console.log(err));

    if (res.status !== 200) {
        return console.log("Unexpected Error");
    }
    console.log(res.data);
    const data = await res.data;
    return data;
};

export const deleteBooking = async (id) => {
    const res = await axios.delete(`/booking/${id}`)
        .catch((err) => console.log(err));

    if (res.status !== 200) {
        return console.log("Unepxected Error");
    }

    const data = await res.data;
    return data;
};

export const deleteMovie = async (id) => {
    const res = await axios.delete(`/movie/${id}`)
        .catch((err) => console.log(err));

    if (res.status !== 200) {
        return console.log("Unepxected Error");
    }

    const data = await res.data;
    return data;
};

export const getUserbyId = async () => {
    const id = localStorage.getItem("userId")
    const res = await axios.get(`/user/${id}`).catch((e) => console.log(e))
    if (res.status !== 200) {
        return console.log("Unepxected Error");
    }

    const data = await res.data;
    console.log(data);
    return data;
}

export const addMovie = async (datas) => {
    const res = await axios.post("/movie",
        {
            title: datas.title,
            description: datas.description,
            releaseDate: datas.releaseDate,
            rating: datas.rating,
            hours: datas.hours,
            posterURL: datas.posterURL,
            fetaured: datas.fetaured,
            actors: datas.actors,
            admin: localStorage.getItem("adminID"),
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
        }
    )
        .catch((err) => console.log(err));

    if (res.status !== 200) {
        return console.log("Unexpected Error Occurred");
    }
    console.log("hello");
    const data = await res.data;
    return data;
};

export const getAdminById = async () => {
    const adminId = localStorage.getItem("adminID");
    
    const res = await axios.get(`/admin/${adminId}`)
        .catch((err) => console.log(err));

        console.log(res.status);
    if (res.status !== 200) {
        return console.log("Unexpected Error Occurred");
    }

    const data = await res.data;
    return data;
};