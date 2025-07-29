'use client'

import {
	Button,
	Card,
	Checkbox,
	Col,
	Form,
	InputNumber,
	Row,
	Statistic,
} from 'antd'
import {
	ClockCircleOutlined,
	DollarCircleOutlined,
	PercentageOutlined,
	CalculatorOutlined,
	SafetyCertificateOutlined,
	HeartOutlined,
	UserOutlined,
	InsuranceOutlined,
	MinusCircleOutlined,
	CheckCircleOutlined,
} from '@ant-design/icons'
import { useState } from 'react'

export default function Home() {
	const [result, setResult] = useState<any>(null)
	const [precision, setPrecision] = useState(false)

	const formatter = new Intl.NumberFormat('es-CO', {
		style: 'currency',
		currency: 'COP',
		minimumFractionDigits: precision ? 2 : 0,
		maximumFractionDigits: precision ? 2 : 0,
	})

	const onFinish = (values: any) => {
		const HOURS = parseFloat(values.horas)
		const HOUR_PRICE = parseFloat(values.precioHora)
		const TOTAL = HOURS * HOUR_PRICE
		const RETEFUENTE = TOTAL * 0.04
		const IBC = TOTAL * 0.4
		const HEALTH = IBC * 0.125
		const pension = IBC * 0.16
		const ARL = IBC * 0.00522
		const seguridadSocial = HEALTH + pension + ARL
		const descontado = seguridadSocial + RETEFUENTE
		const FREE = TOTAL - descontado

		setResult({
			horas: HOURS,
			total: TOTAL,
			retefuente: RETEFUENTE,
			ibc: IBC,
			salud: HEALTH,
			pension,
			arl: ARL,
			seguridadSocial,
			descontado,
			libre: FREE,
		})
	}

	const explanationItems = [
		{
			icon: <ClockCircleOutlined style={{ fontSize: 22, color: '#1677ff' }} />,
			label: 'Horas laboradas',
			desc: 'Total de horas extra ingresadas por el usuario.',
		},
		{
			icon: <DollarCircleOutlined style={{ fontSize: 22, color: '#52c41a' }} />,
			label: 'Total devengado',
			desc: 'Multiplicación de horas laboradas por el valor por hora.',
		},
		{
			icon: <PercentageOutlined style={{ fontSize: 22, color: '#faad14' }} />,
			label: 'Retención en la fuente (4%)',
			desc: '4% del total devengado, según normativa colombiana.',
		},
		{
			icon: <CalculatorOutlined style={{ fontSize: 22, color: '#722ed1' }} />,
			label: 'Base de cotización (IBC)',
			desc: '40% del total devengado, base para aportes de seguridad social.',
		},
		{
			icon: <HeartOutlined style={{ fontSize: 22, color: '#eb2f96' }} />,
			label: 'Aporte a salud',
			desc: '12.5% del IBC, corresponde al aporte obligatorio de salud.',
		},
		{
			icon: <UserOutlined style={{ fontSize: 22, color: '#1890ff' }} />,
			label: 'Aporte a pensión',
			desc: '16% del IBC, corresponde al aporte obligatorio de pensión.',
		},
		{
			icon: <InsuranceOutlined style={{ fontSize: 22, color: '#fa541c' }} />,
			label: 'Aporte a ARL',
			desc: '0.522% del IBC, corresponde al aporte de riesgos laborales.',
		},
		{
			icon: (
				<SafetyCertificateOutlined style={{ fontSize: 22, color: '#13c2c2' }} />
			),
			label: 'Total seguridad social',
			desc: 'Suma de los aportes a salud, pensión y ARL.',
		},
		{
			icon: <MinusCircleOutlined style={{ fontSize: 22, color: '#ff4d4f' }} />,
			label: 'Total descontado',
			desc: 'Suma de la retención en la fuente y total seguridad social.',
		},
		{
			icon: <CheckCircleOutlined style={{ fontSize: 22, color: '#52c41a' }} />,
			label: 'Valor neto a recibir',
			desc: 'Total devengado menos el total descontado.',
		},
	]

	return (
		<div
			style={{
				maxWidth: 600,
				margin: '0 auto',
				padding: 24,
				fontFamily:
					'"Segoe UI", "Segoe UI Emoji", "Segoe UI Symbol", "Arial", "sans-serif"',
			}}
		>
			<Card title='Calculadora de Horas Extra'>
				<Form
					layout='vertical'
					onFinish={onFinish}
				>
					<Form.Item
						label='Horas'
						name='horas'
						rules={[{ required: true, message: 'Ingrese las horas' }]}
					>
						<InputNumber
							step='0.1'
							min='0'
							placeholder='Ej: 80.5'
							controls={false}
							style={{ width: '100%' }}
							// @ts-ignore
							parser={(value) => Number(String(value).replace(/[^\d.]/g, ''))}
						/>
					</Form.Item>

					<Form.Item
						label='Valor por hora'
						name='precioHora'
						rules={[{ required: true, message: 'Ingrese el valor por hora' }]}
					>
						<InputNumber
							style={{ width: '100%' }}
							placeholder='Ej: 45000'
							min={0}
							step={1000}
							controls={false}
							formatter={(value) =>
								new Intl.NumberFormat('es-CO', {
									style: 'currency',
									currency: 'COP',
									minimumFractionDigits: 0,
									maximumFractionDigits: 0,
								}).format(Number(value))
							}
							// @ts-ignore
							parser={(value) => Number(String(value).replace(/[^\d]/g, ''))}
						/>
					</Form.Item>

					<Form.Item>
						<Checkbox
							checked={precision}
							onChange={(e) => setPrecision(e.target.checked)}
						>
							Mostrar 2 decimales
						</Checkbox>
					</Form.Item>

					<Button
						type='primary'
						htmlType='submit'
						style={{ width: '100%' }}
					>
						Calcular
					</Button>
				</Form>
			</Card>

			{result && (
				<>
					<Card
						title='Resultados'
						style={{ marginTop: 24 }}
					>
						<Row gutter={[16, 16]}>
							<Col span={12}>
								<Statistic
									title='Horas laboradas'
									value={result.horas}
									prefix={
										<ClockCircleOutlined
											style={{ color: '#1677ff', fontSize: 22, marginRight: 2 }}
										/>
									}
								/>
							</Col>
							<Col span={12}>
								<Statistic
									title='Total devengado'
									value={formatter.format(result.total)}
									prefix={
										<DollarCircleOutlined
											style={{ color: '#52c41a', fontSize: 22, marginRight: 2 }}
										/>
									}
								/>
							</Col>
							<Col span={12}>
								<Statistic
									title='Retención en la fuente (4%)'
									value={formatter.format(result.retefuente)}
									prefix={
										<PercentageOutlined
											style={{ color: '#faad14', fontSize: 22, marginRight: 2 }}
										/>
									}
								/>
							</Col>
							<Col span={12}>
								<Statistic
									title='Base de cotización (IBC)'
									value={formatter.format(result.ibc)}
									prefix={
										<CalculatorOutlined
											style={{ color: '#722ed1', fontSize: 22, marginRight: 2 }}
										/>
									}
								/>
							</Col>
							<Col span={12}>
								<Statistic
									title='Aporte a salud'
									value={formatter.format(result.salud)}
									prefix={
										<HeartOutlined
											style={{ color: '#eb2f96', fontSize: 22, marginRight: 2 }}
										/>
									}
								/>
							</Col>
							<Col span={12}>
								<Statistic
									title='Aporte a pensión'
									value={formatter.format(result.pension)}
									prefix={
										<UserOutlined
											style={{ color: '#1890ff', fontSize: 22, marginRight: 2 }}
										/>
									}
								/>
							</Col>
							<Col span={12}>
								<Statistic
									title='Aporte a ARL'
									value={formatter.format(result.arl)}
									prefix={
										<InsuranceOutlined
											style={{ color: '#fa541c', fontSize: 22, marginRight: 2 }}
										/>
									}
								/>
							</Col>
							<Col span={12}>
								<Statistic
									title='Total seguridad social'
									value={formatter.format(result.seguridadSocial)}
									prefix={
										<SafetyCertificateOutlined
											style={{ color: '#13c2c2', fontSize: 22, marginRight: 2 }}
										/>
									}
								/>
							</Col>
							<Col span={12}>
								<Statistic
									title='Total descontado'
									value={formatter.format(result.descontado)}
									prefix={
										<MinusCircleOutlined
											style={{ color: '#ff4d4f', fontSize: 22, marginRight: 2 }}
										/>
									}
								/>
							</Col>
							<Col span={12}>
								<Statistic
									title='Valor neto a recibir'
									value={formatter.format(result.libre)}
									valueStyle={{ fontWeight: 'bold' }}
									prefix={
										<CheckCircleOutlined
											style={{ color: '#52c41a', fontSize: 22, marginRight: 2 }}
										/>
									}
								/>
							</Col>
						</Row>
					</Card>

					<Card
						title='Explicación técnica de cada valor'
						style={{ marginTop: 24 }}
					>
						<div>
							{explanationItems.map((item, idx) => (
								<div
									key={idx}
									style={{
										display: 'flex',
										alignItems: 'center',
										marginBottom: 16,
									}}
								>
									<div
										style={{
											width: 22,
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											marginRight: 8,
										}}
									>
										{item.icon}
									</div>
									<div style={{ flex: 1 }}>
										<b>{item.label}:</b> {item.desc}
									</div>
								</div>
							))}
						</div>
					</Card>
				</>
			)}
			<footer
				style={{
					textAlign: 'center',
					marginTop: 32,
					color: '#888',
					fontSize: 14,
				}}
			>
				<a
					href='https://slogive.com'
					target='_blank'
					rel='noopener noreferrer'
					style={{
						color: '#1677ff',
						textDecoration: 'none',
						display: 'inline-flex',
						alignItems: 'center',
						gap: 6,
						marginTop: 8,
					}}
				>
					Made with <HeartOutlined style={{ color: '#1677ff', fontSize: 18 }} />{' '}
					by Cesar Fonseca
				</a>
			</footer>
		</div>
	)
}
