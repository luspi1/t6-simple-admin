import { type FC } from 'react'

import cn from 'classnames'
import { NotificationSvg } from 'src/UI/icons/notificationSVG'
import { Link } from 'react-router-dom'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import { AdminPersonalSvg } from 'src/UI/icons/adminPersonalSVG'
import { LoginIconSvg } from 'src/UI/icons/loginIconSVG'
import { useActions } from 'src/hooks/actions/actions'
import { AuthModal } from 'src/modals/auth-modal/auth-modal'
import { useAppSelector } from 'src/hooks/store'
import { authUser, isAuthUser } from 'src/store/auth/auth.selectors'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { useLogoutUserMutation } from 'src/store/auth/auth.api'

import styles from './index.module.scss'

export const AdminPersonal: FC = () => {
	const { openModal, setAuth, setUser } = useActions()
	const [logoutUser] = useLogoutUserMutation()

	const currentUser = useAppSelector(authUser)
	const isAuth = useAppSelector(isAuthUser)

	const handleLogoutUser = async () => {
		try {
			await logoutUser(null)
			setAuth(false)
			setUser(null)
			localStorage.removeItem('token')
		} catch (e) {
			console.log(e)
		}
	}
	const openAuthModal = () => {
		openModal(<AuthModal />)
	}
	if (!isAuth)
		return (
			<button className={styles.loginBtn} onClick={openAuthModal} type='button'>
				Войти
				<LoginIconSvg />
			</button>
		)

	return (
		<div className={styles.adminPersonal}>
			<Link
				className={cn(styles.notificationLink, { [styles._unread]: true })}
				to={AdminRoute.AdminNotifications}
			>
				<NotificationSvg />
			</Link>
			<Link to={AdminRoute.AdminPersonal}>
				<AdminPersonalSvg />
			</Link>
			<span className={styles.userName}>{currentUser?.username}</span>
			<AdminButton $variant='light' $height='35px' onClick={handleLogoutUser} type='button'>
				Выйти
			</AdminButton>
		</div>
	)
}