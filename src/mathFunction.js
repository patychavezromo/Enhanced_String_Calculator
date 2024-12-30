const mathFunction = {

    add: (data) => {
        if (data.length === 0) {
            return 0;
        }
        if (data.length === 1) {
            return data[0];
        }
        return data[0] + data[1];
    }

}

export default mathFunction;