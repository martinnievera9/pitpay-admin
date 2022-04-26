<?php
/**
 * The main template file
 *
 * @package PitPay
 */

$args = array(
	'taxonomy'   => 'faq-category',
	'hide_empty' => false,
	'parent'     => 0,
);

$the_query = new WP_Term_Query( $args );

get_header(); ?>
	<main id="primary" class="site__main site-main homepage">
		<div class="home-hero">
			<h1 class="home-title">
				<?php echo esc_html( get_theme_mod( 'your_theme_logo', 'Pit Pay' ) ); ?> Help Center
			</h1>
			<h3 class="home-subtitle">
				What Can We Help You With Today?
			</h3>
		</div>
		<div class="home-categories">
			<ul>
				<?php foreach ( $the_query->get_terms() as $term ) { ?>
					<?php $image_url = function_exists( 'z_taxonomy_image_url' ) ? z_taxonomy_image_url( $term->term_id ) : bloginfo( 'template_directory' ) + '/images/phone-1.png'; ?>
    				<li>
						<a href="<?php echo esc_url( get_category_link( $term->term_id ) ); ?>">
							<div class="category-image">
								<img src="<?php echo esc_url( $image_url ); ?>" alt = 'Picture' />
							</div>
							<div class="home-category-content">
								<p><?php echo esc_html( $term->name ); ?></p>
								<?php echo $term->description; ?>
							</div>
							<div class="home-category-button">
								<svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M4.93949 7.4915L0 12.5994L1.73419 14.25L8.25 7.49163L1.73419 0.75L0 2.40065L4.93949 7.4915Z" />
								</svg>
							</div>
						</a>
					</li>
				<?php } ?>
			</ul>
		</div>
		<div class="divider">
			<div class="divider-wrapper"></div>
		</div>
		<?php get_template_part( 'partials/support' ); ?>
	</main>
<?php
get_footer();
