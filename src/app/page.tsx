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

	return (
		<div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
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
				<Card
					title='Resultados'
					style={{ marginTop: 24 }}
				>
					<Row gutter={[16, 16]}>
						<Col span={12}>
							<Statistic
								title='Horas laboradas'
								value={result.horas}
							/>
						</Col>
						<Col span={12}>
							<Statistic
								title='Total devengado'
								value={formatter.format(result.total)}
							/>
						</Col>
						<Col span={12}>
							<Statistic
								title='Retención en la fuente (4%)'
								value={formatter.format(result.retefuente)}
							/>
						</Col>
						<Col span={12}>
							<Statistic
								title='Base de cotización (IBC)'
								value={formatter.format(result.ibc)}
							/>
						</Col>
						<Col span={12}>
							<Statistic
								title='Aporte a salud'
								value={formatter.format(result.salud)}
							/>
						</Col>
						<Col span={12}>
							<Statistic
								title='Aporte a pensión'
								value={formatter.format(result.pension)}
							/>
						</Col>
						<Col span={12}>
							<Statistic
								title='Aporte a ARL'
								value={formatter.format(result.arl)}
							/>
						</Col>
						<Col span={12}>
							<Statistic
								title='Total seguridad social'
								value={formatter.format(result.seguridadSocial)}
							/>
						</Col>
						<Col span={12}>
							<Statistic
								title='Total descontado'
								value={formatter.format(result.descontado)}
							/>
						</Col>
						<Col span={12}>
							<Statistic
								title='Valor neto a recibir'
								value={formatter.format(result.libre)}
								valueStyle={{ fontWeight: 'bold' }}
							/>
						</Col>
					</Row>
				</Card>
			)}
		</div>
	)
}
