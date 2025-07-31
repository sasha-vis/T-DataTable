import { useState } from "react";
import { Form } from "antd";
import moment from "moment";
import { type TableData, type FormValues } from "../types";

export const useTableData = () => {
  const [data, setData] = useState<TableData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm<FormValues>();

  const showModal = () => {
    form.resetFields();
    setEditingKey("");
    setIsModalVisible(true);
  };

  const handleEdit = (record: TableData) => {
    form.setFieldsValue({
      name: record.name,
      date: moment(record.date),
      value: record.value,
    });
    setEditingKey(record.key);
    setIsModalVisible(true);
  };

  const handleDelete = (key: string) => {
    setData(data.filter((item) => item.key !== key));
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newRecord: TableData = {
        key: editingKey || Date.now().toString(),
        name: values.name,
        date: values.date.format("YYYY-MM-DD"),
        value: values.value,
      };

      if (editingKey) {
        setData(
          data.map((item) => (item.key === editingKey ? newRecord : item))
        );
      } else {
        setData([...data, newRecord]);
      }

      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchText)
    )
  );

  return {
    data,
    filteredData,
    isModalVisible,
    editingKey,
    form,
    showModal,
    handleEdit,
    handleDelete,
    handleOk,
    handleCancel,
    handleSearch,
  };
};
