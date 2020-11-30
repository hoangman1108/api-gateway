export default `query users{
  listUsers{
    users{
      id
      name
      password
      email
    }
  }
}

query lesson{
  lesson{
    id
    startDate
    name
    endDate
  }
}`;