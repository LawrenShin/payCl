import React from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Input,
    Select,
    Button,
    Card,
    DatePicker,
    Row,
    Col,
    Divider,
} from 'antd';
import { FormItem } from './styled';

const { Option } = Select;
const { RangePicker } = DatePicker;

const locale = {
    lang: {
        placeholder: 'Выберите дату',
        rangePlaceholder: ['От', 'До'],
        today: 'Сегодня',
        now: 'Сейчас',
        backToToday: 'Вернуться к сегодня',
        ok: 'Готово',
        clear: 'Очистить',
        month: 'Месяц',
        year: 'Год',
        timeSelect: 'Выберите время',
        dateSelect: 'Выберите дату',
        monthSelect: 'Выберите месяц',
        yearSelect: 'Выберите год',
        decadeSelect: 'Выберите квартал',
        yearFormat: 'YYYY',
        dateFormat: 'M/D/YYYY',
        dayFormat: 'D',
        dateTimeFormat: 'M/D/YYYY HH:mm:ss',
        monthFormat: 'MMMM',
        monthBeforeYear: true,
        previousMonth: 'Предыдущий месяц (PageUp)',
        nextMonth: 'Следующий месяц (PageDown)',
        previousYear: 'Последний год (Control + left)',
        nextYear: 'Следующий год (Control + right)',
        previousDecade: 'Последний квартал',
        nextDecade: 'Следующий квартал',
        previousCentury: 'Последний век',
        nextCentury: 'Следующий век',
    },
    timePickerLocale: {
        placeholder: 'Выберите время',
    },
    dateFormat: 'YYYY-MM-DD',
    dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
    weekFormat: 'YYYY-wo',
    monthFormat: 'YYYY-MM',
};

export default class Filter extends React.Component {
    state = {
        id: this.props.filter.id,
        externalId: this.props.filter.external_id,
        arn: this.props.filter.arn,
    };

    componentDidMount() {
        this.applyFilter();
    }

    onChangeId = (event) => {
        this.setState({ id: event.target.value });
    };

    onChangeExternalId = (event) => {
        this.setState({ externalId: event.target.value });
    };

    onChangeARN = (event) => {
        this.setState({ arn: event.target.value });
    };

    onChangePeriod = ([start, end]) => {
        if (start && end) {
            this.props.filterPeriod([start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')]);
        } else {
            this.props.filterPeriod([]);
        }
    };

    onChangeConfirmPeriod = ([start, end]) => {
        if (start && end) {
            this.props.filterConfirmPeriod([start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')]);
        } else {
            this.props.filterConfirmPeriod([]);
        }
    };

    onClear = () => {
        this.props.filterReset();
        this.setState({
            id: '',
            externalId: '',
            arn: '',
        }, () => {
            this.applyFilter();
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        this.applyFilter();
    };

    applyFilter() {
        const {
            filterId,
            filterExternalId,
            filterArn,
            filterApply,
        } = this.props;
        const { id, externalId, arn } = this.state;

        if (id.length) {
            filterId(id);
        }

        if (externalId.length) {
            filterExternalId(externalId);
        }

        if (arn.length) {
            filterArn(arn);
        }

        filterApply();
    }

    render() {
        const {
            loading,
            states,
            systems,
            methods,
            filter,
            filterMethod,
            filterSystem,
            filterState,
        } = this.props;
        const { id, externalId, arn } = this.state;

        return (
            <Card size="small" bordered={false}>
                <Form onSubmit={this.onSubmit}>
                    <Row gutter={24}>
                        <Col lg={4} md={8}>
                            <FormItem drop>
                                <Input
                                    placeholder="ID"
                                    value={id}
                                    onChange={this.onChangeId}
                                />
                            </FormItem>
                        </Col>
                        <Col lg={4} md={8}>
                            <FormItem drop>
                                <Input
                                    placeholder="EXT ID"
                                    value={externalId}
                                    onChange={this.onChangeExternalId}
                                />
                            </FormItem>
                        </Col>
                        <Col lg={4} md={8}>
                            <FormItem drop>
                                <Select
                                    placeholder="Статус"
                                    allowClear
                                    showSearch
                                    value={filter.state || undefined}
                                    onChange={filterState}
                                >
                                    {Object.keys(states).map(key => (
                                        <Option key={key} value={key}>{states[key]}</Option>
                                    ))}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col lg={4} md={8}>
                            <FormItem drop>
                                <Select
                                    placeholder="Система"
                                    allowClear
                                    value={Number(filter.system) || undefined}
                                    onChange={filterSystem}
                                >
                                    {systems.map(({ id: value, name }) => (
                                        <Option key={value} value={value}>{name}</Option>
                                    ))}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col lg={4} md={8}>
                            <FormItem drop>
                                <Select
                                    placeholder="Метод"
                                    allowClear
                                    value={Number(filter.method) || undefined}
                                    onChange={filterMethod}
                                >
                                    {methods.map(({ id: value, name }) => (
                                        <Option key={value} value={value}>{name}</Option>
                                    ))}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col lg={4} md={8}>
                            <FormItem drop>
                                <Input
                                    placeholder="ARN"
                                    value={arn}
                                    onChange={this.onChangeARN}
                                />
                            </FormItem>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={8}>
                            <FormItem label="Создано" drop>
                                <RangePicker
                                    value={filter.created_at}
                                    locale={locale}
                                    onChange={this.onChangePeriod}
                                    style={{ width: '100%' }}
                                />
                            </FormItem>
                        </Col>

                        <Col span={8}>
                            <FormItem label="Подтверждено" drop>
                                <RangePicker
                                    value={filter.confirmed_at}
                                    locale={locale}
                                    onChange={this.onChangeConfirmPeriod}
                                    style={{ width: '100%' }}
                                />
                            </FormItem>
                        </Col>

                        <Col span={8} style={{ textAlign: 'right', paddingTop: 46 }}>
                            <Button onClick={this.onClear}>Очистить</Button>
                            <Divider type="vertical" />
                            <Button
                                htmlType="submit"
                                type="primary"
                                loading={loading}
                            >
                                Применить
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        );
    }
}

Filter.propTypes = {
    loading: PropTypes.bool.isRequired,
    states: PropTypes.shape().isRequired,
    systems: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    methods: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    filter: PropTypes.shape({
        id: PropTypes.string,
        externalId: PropTypes.string,
        method: PropTypes.number,
        system: PropTypes.number,
        arn: PropTypes.string,
        state: PropTypes.string,
        period: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    filterId: PropTypes.func.isRequired,
    filterExternalId: PropTypes.func.isRequired,
    filterMethod: PropTypes.func.isRequired,
    filterSystem: PropTypes.func.isRequired,
    filterArn: PropTypes.func.isRequired,
    filterState: PropTypes.func.isRequired,
    filterPeriod: PropTypes.func.isRequired,
    filterReset: PropTypes.func.isRequired,
    filterApply: PropTypes.func.isRequired,
};
