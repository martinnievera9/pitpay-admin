<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Nineteen
 * @since Twenty Nineteen 1.0
 */

?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer">
		<div class="footer-wrapper">
			<div class="footer-top">
				<div class="footer-top-content">
					<div class="footer-logo">
						<?php echo inline_svg( 'logo-footer' ); ?>
					</div>
					<!-- <div>
						<h2>Skip the line & save some time.</h2>
						<p>Choose your mobile platform and download for free!</p>
					</div> -->
				</div>
				<div class="download-buttons">
					<a href="https://apps.apple.com/us/app/pit-pay/id1489064521?ls=1" class="download-button" target="_blank">
						<?php echo inline_svg( 'AppleBadge' ); ?>
					</a>
					<a href="https://play.google.com/store/apps/details?id=com.pitpay.pitpay" class="download-button" target="_blank">
						<?php echo inline_svg( 'GoogleBadge' ); ?>
					</a>
				</div>
			</div>
			<div class="footer-bottom">
				<p class="footer-terms-desktop footer-terms">© <?php echo esc_html( gmdate( 'Y' ) ); ?> Pit Pay Inc. All Rights Reserved.</p>
				<?php wp_nav_menu( array( 'theme_location' => 'footer-menu' ) ); ?>
				<div class="footer-social-icons">
					<a href="https://www.facebook.com/PitPayApp">
						<div class="footer-social-icon">
							<?php echo inline_svg( 'facebook' ); ?>
						</div>
					</a>
					<a href="https://www.instagram.com/pitpayapp/">
						<div class="footer-social-icon">
							<?php echo inline_svg( 'instagram' ); ?>
						</div>
					</a>
					<a href="https://twitter.com/pitpayapp">
						<div class="footer-social-icon twitter">
							<?php echo inline_svg( 'twitter' ); ?>
						</div>
					</a>
					<a href="https://www.linkedin.com/company/pitpay/about/">
						<div class="footer-social-icon">
							<?php echo inline_svg( 'linkedin' ); ?>
						</div>
					</a>
				</div>
				<p class="footer-terms-mobile footer-terms">© <?php echo esc_html( gmdate( 'Y' ) ); ?> Pit Pay Inc. All Rights Reserved.</p>
			</div>
		</div>
		<a href="<?php echo esc_url( get_theme_mod( 'help_form_url' ) ); ?>" class="footer-support-button" target="_blank">
			<div class="footer-support-button-wrapper">
				<p>Submit Support Request</p>
				<div class="support-request-icon">
					<div class="support-request-icon-wrapper">
						<svg viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M3.66371 4.49491L0.700012 7.55963L1.74053 8.55001L5.65001 4.49499L1.74053 0.450012L0.700012 1.4404L3.66371 4.49491Z" fill="white"/>
						</svg>
					</div>
				</div>
			</div>
		</a>
	</footer><!-- #colophon -->

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
