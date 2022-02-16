import React from "react";
import { Link, Route } from "react-router-dom";
import {
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

import { useQuery } from "react-query";
import { fetchOrders } from "../../../api";

function Orders() {
  const { isLoading, isError, data, error } = useQuery(
    "admin:orders",
    fetchOrders
  );
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>{error.massage}</div>;
  }
  console.log(data, "qqq");

  return (
    <div>
      <Text fontSize="2xl" p={5}>
        Orders
      </Text>
      <Table>
        <TableCaption> Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th> User</Th>
            <Th> Address</Th>
            <Th> Items</Th>
            <Th> Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item._id}>
              <Td>{item.user.email}</Td>
              <Td>{item.adress}</Td>
              <Td>{item.items.length}</Td>
              <Td>{item.createdAt}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
export default Orders;
