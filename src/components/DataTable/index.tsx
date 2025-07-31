import {
  Table,
  Button,
  Input,
  Modal,
  Form,
  DatePicker,
  InputNumber,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useTableData } from "./hooks/useTableData";
import { type TableData } from "./types";

const { Column } = Table;
const { Search } = Input;

export const DataTable = () => {
  const {
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
  } = useTableData();

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Search
          placeholder="Поиск по таблице"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          style={{ width: 300 }}
          onSearch={handleSearch}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Добавить
        </Button>
      </div>

      <Table
        dataSource={filteredData}
        bordered
        pagination={{ pageSize: 5 }}
        scroll={{ x: true }}
        rowKey="key"
      >
        <Column
          title="Имя"
          dataIndex="name"
          key="name"
          sorter={(a: TableData, b: TableData) => a.name.localeCompare(b.name)}
        />
        <Column
          title="Дата"
          dataIndex="date"
          key="date"
          sorter={(a: TableData, b: TableData) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
          }
        />
        <Column
          title="Числовое значение"
          dataIndex="value"
          key="value"
          sorter={(a: TableData, b: TableData) => a.value - b.value}
        />
        <Column
          title="Действия"
          key="action"
          render={(_: unknown, record: TableData) => (
            <div>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
              />
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.key)}
              />
            </div>
          )}
        />
      </Table>

      <Modal
        title={editingKey ? "Редактировать запись" : "Добавить запись"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Имя"
            rules={[{ required: true, message: "Пожалуйста, введите имя!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Дата"
            rules={[{ required: true, message: "Пожалуйста, выберите дату!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="value"
            label="Числовое значение"
            rules={[{ required: true, message: "Пожалуйста, введите число!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
