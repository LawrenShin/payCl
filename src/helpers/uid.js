const uid = n => Math.random().toString(36).substr(2, n || 7);

export default uid;
